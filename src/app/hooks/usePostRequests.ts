import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useHeaders from "./useHeaders";

const usePostRequests = (initialData: any, apiUrl: string) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [headers, headersError] = useHeaders("application/json");

  const sendRequest = useCallback(
    async (requestData = initialData) => {
      if (!headers) {
        setError(headersError);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post(apiUrl, requestData, headers);
        setResponse(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, headers, headersError]
  );

  return { response, error, isLoading, sendRequest };
};

export default usePostRequests;

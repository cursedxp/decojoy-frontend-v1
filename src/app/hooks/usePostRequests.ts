import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useHeaders from "./useHeaders";

const usePostRequests = (data: any, apiUrl: string) => {
  const [response, setResponse] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [headers, headersError] = useHeaders("application/json");

  const sendPostRequest = useCallback(
    async (requestData = data) => {
      if (!headers) {
        setError({
          message: "Headers are missing or incorrect.",
          details: headersError,
        });
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post(apiUrl, requestData, headers);
        setResponse(response.data);
      } catch (apiError) {
        setError({ message: "API call failed.", details: apiError });
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, headers, headersError, data]
  );

  return { response, error, isLoading, sendPostRequest };
};

export default usePostRequests;

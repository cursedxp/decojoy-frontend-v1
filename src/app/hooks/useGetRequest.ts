import { useState, useCallback } from "react"; // <- Fixed the 'use' typo
import useHeaders from "./useHeaders";
import axios from "axios";

const useGetRequest = (apiUrl: string) => {
  const [response, setResponse] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [headers, headersError] = useHeaders("application/json");

  const sendGetRequest = useCallback(async () => {
    if (!headers) {
      setError({
        message: "Headers are missing or incorrect.",
        details: headersError,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(apiUrl, { headers: headers.headers });
      setResponse(response.data);
    } catch (apiError) {
      setError({
        message: "API call failed.",
        details: apiError,
      });
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, headers, headersError]);

  return { response, error, isLoading, sendGetRequest };
};
export default useGetRequest;

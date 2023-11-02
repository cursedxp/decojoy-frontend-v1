import { useState, useCallback } from "react";
import useHeaders from "./useHeaders";
import axios from "axios";

const useGetRequest = (apiUrl: string) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    headers,
    isReady,
    error: headersError,
  } = useHeaders("application/json");

  const sendGetRequest = useCallback(async () => {
    if (!apiUrl || !isReady) {
      setError({
        message: !apiUrl ? "API URL is missing." : "Headers are not ready.",
        details: headersError,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(apiUrl, { headers: headers?.headers });
      setResponse(res.data);
    } catch (apiError) {
      setError({ message: "API call failed.", details: apiError });
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, headers, isReady, headersError]);

  return { response, error, isLoading, sendGetRequest };
};
export default useGetRequest;

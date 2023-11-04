import { useState, useCallback, useEffect } from "react";
import useHeaders from "./useHeaders";
import axios from "axios";

const useGetRequest = (apiUrl: string) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    headers,
    isReady,
    error: headersError,
  } = useHeaders("application/json");

  const sendGetRequest = useCallback(async () => {
    if (!apiUrl) {
      setError({ message: "API URL is missing.", details: null });
      return;
    }
    if (!isReady) {
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
  }, [apiUrl, headers, isReady]);

  useEffect(() => {
    if (!isReady && headersError) {
      setError({
        message: "Headers are not ready.",
        details: headersError,
      });
      setIsLoading(false);
    }
  }, [isReady, headersError]);

  return { response, error, isLoading, sendGetRequest };
};
export default useGetRequest;

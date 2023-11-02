import { useState } from "react";
import useHeaders from "./useHeaders";
import axios from "axios";

const useDeleteRequest = (apiUrl: string) => {
  const [response, setResponse] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    headers,
    isReady,
    error: headersError,
  } = useHeaders("application/json");

  const sendDeleteRequest = async (id: number) => {
    if (!headers) {
      setError({
        message: "Headers are missing or incorrect.",
        details: headersError,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: headers.headers,
      });
      setResponse(response.data);
    } catch (apiError) {
      setError({
        message: "API call failed.",
        details: apiError,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return { response, error, isLoading, sendDeleteRequest };
};
export default useDeleteRequest;

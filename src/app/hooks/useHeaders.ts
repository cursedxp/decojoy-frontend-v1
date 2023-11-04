import { useCallback, useEffect, useState } from "react";
import useAccessToken from "./useAccessToken";

interface Headers {
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
}

const useHeaders = (contentType: string) => {
  const [headers, setHeaders] = useState<Headers | undefined>(undefined);
  // const [error, setError] = useState<any>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { accessToken, isLoading, error: accessTokenError } = useAccessToken();

  const prepareHeaders = useCallback(() => {
    if (!isLoading) {
      if (accessToken) {
        setHeaders({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": contentType,
          },
        });
        setIsReady(true);
      } else if (accessTokenError) {
        console.error("accessTokenError", accessTokenError);
        setIsReady(false);
      }
    }
  }, [accessToken, contentType, accessTokenError, isLoading]);

  useEffect(() => {
    prepareHeaders();
  }, [prepareHeaders]);

  return { headers, isReady, error: accessTokenError };
};

export default useHeaders;

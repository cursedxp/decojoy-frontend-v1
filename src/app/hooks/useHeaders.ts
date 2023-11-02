import { useEffect, useState } from "react";
import useAccessToken from "./useAccessToken";
import { set } from "@auth0/nextjs-auth0/dist/session";

interface Headers {
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
}

const useHeaders = (contentType: string) => {
  const [headers, setHeaders] = useState<Headers>();
  const [error, setError] = useState<any>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { accessToken, error: accessTokenError } = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      setHeaders({
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": contentType,
        },
      });
      setIsReady(true);
    } else if (accessTokenError) {
      setError(accessTokenError);
      setIsReady(false);
    }
  }, [contentType, accessToken, accessTokenError]);

  return { headers, isReady, error };
};

export default useHeaders;

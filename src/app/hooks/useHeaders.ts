import { useEffect, useState } from "react";
import useAccessToken from "./useAccessToken";

interface Headers {
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
}

const useHeaders = (contentType: string): [Headers | undefined, any] => {
  const [headers, setHeaders] = useState<Headers>();
  const [error, setError] = useState<any>(null);
  const { accessToken, error: accessTokenError } = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      setHeaders({
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": contentType,
        },
      });
    } else if (accessTokenError) {
      setError(accessTokenError);
    }
  }, [contentType, accessToken, accessTokenError]);

  return [headers, error];
};

export default useHeaders;

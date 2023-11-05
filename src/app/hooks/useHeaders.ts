import { use, useCallback, useEffect, useState } from "react";
import useAccessToken from "./useAccessToken";
import { set } from "@auth0/nextjs-auth0/dist/session";

interface HeadersState {
  headers: {
    Authorization?: string;
    "Content-Type": string;
  };
  isReady: boolean;
  error: string | null;
}

const useHeaders = (contentType: string) => {
  const [state, setState] = useState<HeadersState>({
    headers: {
      "Content-Type": contentType,
    },
    isReady: false,
    error: null,
  });

  const { accessToken, isReady, error: accessTokenError } = useAccessToken();

  const prepareHeaders = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      headers: {
        ...prevState.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      isReady: true,
    }));
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && isReady) {
      prepareHeaders();
    } else if (accessTokenError) {
      setState((prevState) => ({
        ...prevState,
        error: "Access token is missing or incorrect.",
      }));
    }
  }, [prepareHeaders, accessTokenError, accessToken, isReady]);

  return state;
};

export default useHeaders;

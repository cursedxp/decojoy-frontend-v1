import { useState, useCallback, useEffect, useRef } from "react";
import useHeaders from "./useHeaders";
import axios from "axios";
import { set } from "@auth0/nextjs-auth0/dist/session";

interface GetRequestState {
  response: any;
  error: any;
  isReady: boolean;
}

const useGetRequest = (apiUrl: string) => {
  const [state, setState] = useState<GetRequestState>({
    response: null,
    error: null,
    isReady: false,
  });

  const {
    headers,
    isReady: isHeadersReady,
    error: headersError,
  } = useHeaders("application/json");

  const requestQueued = useRef(false);

  const sendGetRequest = useCallback(async () => {
    // If headers are not ready, queue the request and wait.
    if (!isHeadersReady) {
      requestQueued.current = true;
      setState((prevState) => ({ ...prevState, isReady: false }));
      return;
    }

    // If headers are ready and the request is queued, proceed with the request.
    setState((prevState) => ({ ...prevState, isReady: true }));

    try {
      const res = await axios.get(apiUrl, { headers: headers });
      setState((prevState) => ({ ...prevState, response: res.data }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error }));
    }
  }, [apiUrl, headers, isHeadersReady]);

  // Watch for headers to become ready if there's a queued request.
  useEffect(() => {
    if (isHeadersReady && requestQueued.current) {
      sendGetRequest();
      requestQueued.current = false;
    }
  }, [sendGetRequest, isHeadersReady]);

  return { state, sendGetRequest };
};
export default useGetRequest;

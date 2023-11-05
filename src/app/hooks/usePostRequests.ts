import React, { useEffect, useState, useCallback, use } from "react";
import axios from "axios";
import useHeaders from "./useHeaders";

interface PostRequestState {
  response: any;
  error: any;
  isReady: boolean;
}

const usePostRequests = (id: any, apiUrl: string) => {
  const [state, setState] = useState<PostRequestState>({
    response: null,
    error: null,
    isReady: false,
  });

  const {
    headers,
    isReady,
    error: headersError,
  } = useHeaders("application/json");

  const requestQueued = React.useRef(false);

  const sendPostRequest = useCallback(
    async (requestData = id) => {
      // If headers are not ready, queue the request and wait.
      if (!isReady) {
        requestQueued.current = true;
        setState((prevState) => ({ ...prevState, isReady: false }));
        return;
      }

      // If headers are ready and the request is queued, proceed with the request.
      setState((prevState) => ({ ...prevState, isReady: true }));

      try {
        const res = await axios.post(apiUrl, requestData, { headers: headers });
        setState((prevState) => ({ ...prevState, response: res.data }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error: error }));
      }
    },
    [apiUrl, headers, isReady, id]
  );

  // Watch for headers to become ready if there's a queued request.
  useEffect(() => {
    if (isReady && requestQueued.current) {
      sendPostRequest();
      requestQueued.current = false;
    }
  }, [sendPostRequest, isReady]);

  return { state, sendPostRequest };
};

export default usePostRequests;

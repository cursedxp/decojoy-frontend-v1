import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "@auth0/nextjs-auth0/dist/session";

interface AccessTokenState {
  accessToken: string;
  isReady: boolean;
  error: any;
}

const useAccessToken = () => {
  const [state, setState] = useState<AccessTokenState>({
    accessToken: "",
    isReady: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const getAccessToken = async () => {
      try {
        const tokenResponse = await axios.get("/api/getAccessToken");
        if (tokenResponse) {
          const accessToken = tokenResponse.data.accessToken;
          if (isMounted) {
            setState((prevState) => ({
              ...prevState,
              accessToken: accessToken,
              isReady: true,
            }));
          }
        }
      } catch (error) {
        if (isMounted) {
          setState({
            accessToken: "",
            isReady: false,
            error: error,
          });
        }
      }
    };
    getAccessToken();
    // Cleanup function to prevent setting state after unmounting
    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};

export default useAccessToken;

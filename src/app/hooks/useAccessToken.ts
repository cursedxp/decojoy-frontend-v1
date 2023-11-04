import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "@auth0/nextjs-auth0/dist/session";

interface AccessTokenState {
  accessToken: string;
  isLoading: boolean;
  error: any;
}

const useAccessToken = () => {
  const [state, setState] = useState<AccessTokenState>({
    accessToken: "",
    isLoading: true,
    error: null,
  });
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const getAccessToken = async () => {
      try {
        const tokenResponse = await axios.get("/api/getAccessToken");
        const accessToken = tokenResponse.data.accessToken;
        if (isMounted) {
          setState({
            accessToken: tokenResponse.data.accessToken,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            accessToken: "",
            isLoading: false,
            error: error,
          });
        }
        setError(error);
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

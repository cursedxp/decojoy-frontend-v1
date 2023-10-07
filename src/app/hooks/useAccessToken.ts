import { useEffect, useState } from "react";
import axios from "axios";

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const getAccessToken = async () => {
      try {
        const tokenResponse = await axios.get("/api/getAccessToken");
        const accessToken = tokenResponse.data.accessToken;
        if (isMounted) {
          setAccessToken(accessToken);
        }
      } catch (error) {
        setError(error);
      }
    };
    getAccessToken();
    return () => {
      isMounted = false;
    };
  }, []);
  return { accessToken, error };
};

export default useAccessToken;

import useGetRequest from "@/app/hooks/useGetRequest";
import React, { useEffect } from "react";

const TestPage: React.FC = () => {
  const { state, sendGetRequest } = useGetRequest(
    process.env.NEXT_PUBLIC_API_URL + "/products"
  );
  const [data, setData] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await sendGetRequest();
    };
    if (!state.response) {
      fetchData();
    }
  }, [sendGetRequest, state.response]);

  useEffect(() => {
    if (state.response) {
      setData(state.response.data);
    }
    console.log("Response", state.response);
  }, [state.response]);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
};

export default TestPage;

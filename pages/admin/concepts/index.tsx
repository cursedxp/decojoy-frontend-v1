import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { getAccessToken } from "@auth0/nextjs-auth0";

//fetch all concepts
//Display all concepts by using the concepts item component
//use addConceptButton to add a new concept

type ConceptPageProps = {
  data: string;
};

type AxiosError = {
  response?: {
    status: number;
    statusText: string;
  };
  request?: any;
  message?: string;
};

const ConceptPage: React.FC<ConceptPageProps> = ({ data }) => {
  return (
    <div>
      <p>Data: {data}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ConceptPageProps> = async (
  context
) => {
  try {
    const { accessToken } = await getAccessToken(context.req, context.res);

    if (!accessToken) {
      return {
        props: {
          data: "User not authenticated",
        },
      };
    }

    const response = await axios.get(process.env.API_URL + "/concepts/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.data;
    return {
      props: { data },
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    // Handling specific error types
    if (axiosError.response && axiosError.response.status === 401) {
      return {
        props: {
          data: "Unauthorized access. Please log in again.",
        },
      };
    } else if (axiosError.response) {
      return {
        props: {
          data: `Error fetching data: ${axiosError.response.status} ${axiosError.response.statusText}`,
        },
      };
    } else if (axiosError.request) {
      return {
        props: {
          data: "Network error. Please check your connection and try again.",
        },
      };
    } else if (axiosError.message) {
      return {
        props: {
          data: `An error occurred: ${axiosError.message}`,
        },
      };
    } else {
      return {
        props: {
          data: "An unknown error occurred.",
        },
      };
    }
  }
};

export default ConceptPage;

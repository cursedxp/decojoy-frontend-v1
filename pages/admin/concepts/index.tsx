import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CustomTable from "../../../src/app/components/CustomTable";
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
    <main className="p-16 flex-col h-screen  bg-stone-100">
      <div className=" text-xs text-gray-500 uppercase ">
        Admin / <span className=" text-sky-500 font-semibold">Concepts</span>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex-col">
          <h1 className="text-lg font-medium">Concepts</h1>
          <p className=" text-sm text-gray-500">
            A list of all the concepts in the database. Click on a concept to
            see more details.
          </p>
        </div>
        <button className=" flex gap-2 items-center py-2 px-4 bg-sky-600 rounded-xl text-white text-sm shadow-sm">
          <PlusCircleIcon className="h-5 w-5" />
          Create
        </button>
      </div>
      <CustomTable />
    </main>
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

    const response = await axios.get(process.env.API_URL + "/concepts", {
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

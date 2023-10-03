import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CustomTable from "../../../src/app/components/CustomTable";
import Modal from "@/app/components/Modal";
import CreateConceptFlow from "@/app/components/CreateConceptFlow";
import { ToastContainer, toast } from "react-toastify";
interface Concept {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  status: string;
  style: string;
  type: string;
  createdAt: string;
}

const ConceptPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState<Concept[]>([]);

  const fetchConceptData = useCallback(async () => {
    const accessToken = await getAccessToken();
    const concepts = await getConcepts(accessToken);
    setData(concepts);
  }, []);

  // Get access token from server
  const getAccessToken = async () => {
    const tokenResponse = await axios.get("/api/getAccessToken");
    const accessToken = tokenResponse.data.accessToken;
    if (!accessToken) {
      return {
        props: {
          data: "User not authenticated",
        },
      };
    }
    return accessToken;
  };

  // Get concepts from server
  const getConcepts = async (accessToken: string) => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/concepts",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.data;
    return data;
  };

  const onClose = () => {
    setShowModal(false);
    fetchConceptData();
  };

  const onConceptCreated = (message: any) => {
    toast.success(message || "Concept successfully created!");
  };

  useEffect(() => {
    fetchConceptData();
  }, []);

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
        <button
          className=" flex gap-2 items-center py-2 px-4 bg-sky-600 rounded-xl text-white text-sm shadow-sm"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <PlusCircleIcon className="h-5 w-5" />
          Create
        </button>
      </div>
      <CustomTable data={data} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal isOpen={showModal} onClose={onClose}>
        <CreateConceptFlow
          onConceptCreated={onConceptCreated}
          onClose={onClose}
        />
      </Modal>
    </main>
  );
};

export default ConceptPage;

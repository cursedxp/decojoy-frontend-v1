import React, { useCallback } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "@/app/components/Modal";
import { ToastContainer, toast } from "react-toastify";
import CustomTable from "@/app/components/CustomTable";
import ProductForm from "@/app/components/ProductForm";
import useGetRequest from "@/app/hooks/useGetRequest";
import useDeleteRequest from "@/app/hooks/useDeleteRequest";
import { set } from "@auth0/nextjs-auth0/dist/session";

const columns = [
  "Image",
  "Title",
  "Description",
  "Price",
  "Created At",
  "Actions",
];

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  createdAt: string;
}

const ProductsPage: React.FC = () => {
  const {
    response: deleteResponse,
    error: deleteError,
    isLoading: deleteIsLoading,
    sendDeleteRequest,
  } = useDeleteRequest(process.env.NEXT_PUBLIC_API_URL + "/products");
  const [showModal, setShowModal] = React.useState(false);
  const {
    response: getResponse,
    error: getError,
    isLoading: getIsLoading,
    sendGetRequest,
  } = useGetRequest(process.env.NEXT_PUBLIC_API_URL + "/products");

  const [data, setData] = React.useState<Product[]>([]);

  const onClose = useCallback(async () => {
    setShowModal(false);
    await sendGetRequest();
    if (getResponse) {
      setData(getResponse);
    } else {
      console.error("Failed to fetch the updated product list.");
    }
  }, [sendGetRequest]);

  const removeProduct = useCallback(
    async (id: number) => {
      const response = await sendDeleteRequest(id);
      if (deleteResponse) {
        toast.success("Product successfully deleted!");
        await sendGetRequest();
        setData(getResponse || []);
      }
    },
    [sendDeleteRequest, sendGetRequest]
  );

  const onProductCreated = (message: any) => {
    toast.success(message || "Product successfully created!");
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await sendGetRequest();
    };
    fetchData();
  }, [sendGetRequest]);

  React.useEffect(() => {
    if (getResponse !== null) {
      setData(getResponse);
    }
  }, [getResponse]);

  React.useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.message || "Error deleting product.");
    }
  }, [deleteError]);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 p-16 flex-col h-screen">
      <div className=" text-xs text-gray-500 uppercase ">
        Admin / <span className=" text-sky-500 font-semibold">Products</span>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex-col">
          <h1 className="text-lg font-medium">Products</h1>
          <p className=" text-sm text-gray-500">
            A list of all products in the database. Click on a product to see
            product details.
          </p>
        </div>
        <button
          className=" flex gap-2 items-center py-2 px-4 bg-sky-600 rounded-xl text-white text-sm shadow-sm"
          onClick={() => setShowModal(true)}
        >
          <PlusCircleIcon className="h-5 w-5" />
          Create
        </button>
      </div>
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
      <Modal onClose={onClose} isOpen={showModal}>
        <ProductForm onProductCreated={onProductCreated} onClose={onClose} />
      </Modal>
      <CustomTable
        items={data}
        columns={columns}
        onRemove={removeProduct}
        contentUrl="products"
      />
    </div>
  );
};

export default ProductsPage;

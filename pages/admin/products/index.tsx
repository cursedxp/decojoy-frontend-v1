import React, { useCallback, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "@/app/components/Modal";
import { ToastContainer } from "react-toastify";
import CustomTable from "@/app/components/CustomTable";
import ProductForm from "@/app/components/ProductForm";
import useGetRequest from "@/app/hooks/useGetRequest";
import useDeleteRequest from "@/app/hooks/useDeleteRequest";
import useToastNotification from "@/app/hooks/useToastNotifications";

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

  const [showModal, setShowModal] = useState(false);

  const { state, sendGetRequest } = useGetRequest(
    process.env.NEXT_PUBLIC_API_URL + "/products"
  );

  const { notifySuccess, notifyError } = useToastNotification();

  const [data, setData] = React.useState<Product[]>([]);

  const onClose = useCallback(() => {
    setShowModal(false);
    sendGetRequest();
  }, [sendGetRequest, setShowModal]);

  const removeProduct = useCallback(
    (id: number) => {
      sendDeleteRequest(id)
        .then(() => {
          notifySuccess("Product successfully deleted!");
          sendGetRequest();
        })
        .catch((error) => {
          notifyError("Error deleting product");
        });
    },
    [sendDeleteRequest, sendGetRequest, notifySuccess, notifyError]
  );

  useEffect(() => {
    sendGetRequest();
  }, [sendGetRequest]);

  useEffect(() => {
    if (state.response) {
      setData(state.response || []);
    }
  }, [state.response]);

  useEffect(() => {
    if (deleteError) {
      notifyError("Error deleting product.");
    }
    if (state.error) {
      notifyError("Error fetching products.");
    }
  }, [deleteError, state.error, notifyError]);

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
      <ToastContainer />
      <Modal onClose={onClose} isOpen={showModal}>
        <ProductForm onClose={onClose} />
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

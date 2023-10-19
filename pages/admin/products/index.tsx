import React, { useCallback } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "@/app/components/Modal";
import { ToastContainer, toast } from "react-toastify";
import CustomTable from "@/app/components/CustomTable";
import ProductForm from "@/app/components/ProductForm";
import useGetRequest from "@/app/hooks/useGetRequest";

const ProductsPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { response, error, isLoading, sendGetRequest } = useGetRequest(
    process.env.NEXT_PUBLIC_API_URL + "/products"
  );

  const columns = ["Image", "Title", "Description", "Price", "Created At"];

  const onClose = useCallback(() => {
    setShowModal(false);
    sendGetRequest();
  }, [sendGetRequest]);

  const onProductCreated = (message: any) => {
    toast.success(message || "Product successfully created!");
  };

  React.useEffect(() => {
    sendGetRequest();
  }, [sendGetRequest]);
  return (
    <main className="p-16 flex-col h-screen  bg-stone-100">
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
      <CustomTable data={response} columns={columns} />
    </main>
  );
};

export default ProductsPage;

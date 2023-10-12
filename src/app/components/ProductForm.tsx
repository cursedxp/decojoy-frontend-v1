import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import usePostRequests from "../hooks/usePostRequests";

const ProductForm: React.FC = () => {
  const { response, error, isLoading, sendPostRequest } = usePostRequests(
    {},
    process.env.NEXT_PUBLIC_API_URL + "/products"
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
      category: "",
      price: 0,
      url: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      image: Yup.string().required("Image is required"),
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number()
        .required("Price is required")
        .typeError("Price must be a number")
        .integer("Price must be an integer number"),
      url: Yup.string().required("URL is required"),
    }),
    onSubmit: (values) => {
      sendPostRequest(values);
    },
  });

  return (
    <form className="mt-4 flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div>
        <div>
          <label htmlFor="title" className="text-xs font-medium">
            Title
          </label>
          <p className=" text-xs text-gray-500">
            Enter your product title here
          </p>
        </div>
        <input
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          onBlur={formik.handleBlur}
          className="block w-full border border-gray-300 rounded-md p-1 text-sm"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-xs">{formik.errors.title}</p>
        )}
      </div>
      <div>
        <div>
          <label htmlFor="url" className="text-xs font-medium">
            URL
          </label>
          <p className=" text-xs text-gray-500">Enter your product URL here</p>
        </div>
        <input
          type="text"
          id="url"
          name="url"
          onChange={formik.handleChange}
          value={formik.values.url}
          onBlur={formik.handleBlur}
          className="block w-full border border-gray-300 rounded-md p-1 text-sm"
        />
        {formik.touched.url && formik.errors.url && (
          <p className="text-red-500 text-xs">{formik.errors.url}</p>
        )}
      </div>
      <div>
        <div>
          <label htmlFor="image" className="text-xs font-medium">
            Image URL
          </label>
          <p className=" text-xs text-gray-500">
            Enter your product image here
          </p>
        </div>
        <input
          type="text"
          id="image"
          name="image"
          onChange={formik.handleChange}
          value={formik.values.image}
          onBlur={formik.handleBlur}
          className="block w-full border border-gray-300 rounded-md p-1 text-sm"
        />
        {formik.touched.image && formik.errors.image && (
          <p className="text-red-500 text-xs">{formik.errors.image}</p>
        )}
      </div>
      <div>
        <div>
          <label htmlFor="description" className="text-xs font-medium">
            Description
          </label>
          <p className=" text-xs text-gray-500">
            Enter your product description here
          </p>
        </div>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          className="block w-full border border-gray-300 rounded-md p-1 text-sm"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs">{formik.errors.description}</p>
        )}
      </div>
      <div>
        <div>
          <label htmlFor="category" className="text-xs font-medium">
            Category
          </label>
          <p className=" text-xs text-gray-500">
            Enter your product category here
          </p>
        </div>
        <input
          type="text"
          id="category"
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          onBlur={formik.handleBlur}
          className="block w-full border border-gray-300 rounded-md p-1 text-sm"
        />

        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-xs">{formik.errors.category}</p>
        )}
      </div>
      <div>
        <div>
          <label htmlFor="price" className="text-xs font-medium">
            Price
          </label>
          <p className=" text-xs text-gray-500">
            Enter your product price here
          </p>
        </div>
        <input
          type="number"
          id="price"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
          onBlur={formik.handleBlur}
          className="block w-full border border-gray-300 rounded-md p-1 text-sm"
        />

        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500 text-xs">{formik.errors.price}</p>
        )}
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-sky-600 rounded-xl text-white text-sm shadow-sm"
      >
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;

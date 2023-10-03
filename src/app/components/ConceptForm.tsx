import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const conceptStyles = [
  "MINIMALIST",
  "MODERN",
  "INDUSTRIAL",
  "SCANDINAVIAN",
  "CONTEMPORARY",
  "MIDCENTURY",
  "ARTDECO",
  "TRADITIONAL",
  "BOHEMIAN",
  "ECLECTIC",
  "CLASSIC",
];

const roomTypes = [
  "KITCHEN",
  "LIVINGROOM",
  "BEDROOM",
  "DININGROOM",
  "BATHROOM",
  "OFFICE",
  "STUDY",
  "ENTRYWAY",
  "LIBRARY",
  "NURSERY",
  "KIDSROOM",
];

export interface CreateConceptFormData {
  title: string;
  description: string;
  style: string;
  type: string;
  price: number;
  images: string[];
  thumbnail: string;
}

interface ConceptInfoFormProps {
  thumbnail: string | null;
  images: string[];
}

export interface ConceptFormRef {
  getFormData: () => CreateConceptFormData;
  submitForm: () => void;
}
// validation schema for the form
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  style: Yup.string()
    .required("Concept style is required")
    .oneOf(conceptStyles, "Invalid concept style")
    .typeError("Concept style must be one of: " + conceptStyles.join(", ")),
  type: Yup.string()
    .required("Room type is required")
    .oneOf(roomTypes, "Invalid room type")
    .typeError("Room type must be one of: " + roomTypes.join(", ")),

  price: Yup.number()
    .typeError("Price must be a number")
    .integer("Price must be an integer number")
    .required("Price is required"),
  thumbnail: Yup.string().required("Thumbnail is required"),
  images: Yup.array()
    .of(Yup.string().required("Each value in images must be a string"))
    .required("Images must be an array"),
});

const ConceptForm = forwardRef<ConceptFormRef, ConceptInfoFormProps>(
  (props, ref) => {
    // formik hook for the form state management and validation handling logic
    const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
        type: "",
        style: "",
        price: 0,
        images: props.images || [],
        thumbnail: props.thumbnail || "", // Adjusted this line
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {},
    });

    // expose the formik methods to the parent component using the useImperativeHandle hook and the ref prop passed to the component
    useImperativeHandle(ref, () => ({
      getFormData: () => formik.values,
      submitForm: formik.submitForm,
      resetForm: formik.resetForm,
    }));

    return (
      <div className="max-w-xl">
        <div>
          <h3 className="text-lg font-medium">Concept details </h3>
          <p className="text-sm text-gray-500">
            Enter details about your concept here and click submit to save it to
          </p>
        </div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-4 flex flex-col gap-3 "
          >
            <div>
              <div>
                <label htmlFor="title" className="text-xs font-medium">
                  Title
                </label>
                <p className=" text-xs text-gray-500">
                  Enter your concept title here
                </p>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className="block w-full border border-gray-300 rounded-md p-1 text-sm "
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-xs">{formik.errors.title}</p>
              )}
            </div>
            <div>
              <div>
                <label
                  htmlFor="description"
                  className=" text-xs font-medium mt-4"
                >
                  Description
                </label>
                <p className=" text-xs text-gray-500">
                  Enter your concept description here.
                </p>
              </div>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="block w-full border border-gray-300 rounded-md p-1 text-sm "
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-xs">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div>
              <div>
                <label htmlFor="style" className=" text-xs font-medium mt-4">
                  Concept Style
                </label>
                <p className=" text-xs text-gray-500">
                  Choose your concept style from the list
                </p>
              </div>
              <select
                id="style"
                name="style"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.style}
                className="block w-full border border-gray-300 rounded-md p-1 text-sm "
              >
                <option value="" disabled>
                  Select a Room Type
                </option>
                {conceptStyles.map((style, index) => (
                  <option key={index} value={style} className="capitalize">
                    {style.charAt(0).toUpperCase() +
                      style.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {formik.touched.style && formik.errors.style && (
                <p className="text-red-500 text-xs">{formik.errors.style}</p>
              )}
            </div>
            <div>
              <div>
                <label htmlFor="type" className=" text-xs font-medium mt-4">
                  Room Type
                </label>
                <p className=" text-xs text-gray-500">
                  Choose your room type from the list
                </p>
              </div>
              <select
                id="type"
                name="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                className="block w-full border border-gray-300 rounded-md p-1 text-sm"
              >
                <option value="" disabled>
                  Select a Room Type
                </option>
                {roomTypes.map((type, index) => (
                  <option key={index} value={type} className="capitalize">
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {formik.touched.type && formik.errors.type && (
                <p className="text-red-500 text-xs">{formik.errors.type}</p>
              )}
            </div>
            <div>
              <div>
                <label htmlFor="price" className=" text-xs font-medium mt-4">
                  Price
                </label>
                <p className=" text-xs text-gray-500">
                  Enter your concept price here
                </p>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="block w-full border border-gray-300 rounded-md p-1 text-sm mb-4"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-xs">{formik.errors.price}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
);

ConceptForm.displayName = "ConceptForm";
export default ConceptForm;

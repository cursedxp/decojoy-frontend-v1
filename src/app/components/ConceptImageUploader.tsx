import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setImages } from "../../../store/conceptSlice";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/outline";

const ConceptImageUploader: React.FC = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        // Get the user's access token
        const tokenResponse = await axios.get("/api/getAccessToken");
        const accessToken = tokenResponse.data.accessToken;
        console.log("accessToken", accessToken);
        if (!accessToken) {
          throw new Error("Access token missing");
        }

        // Create a FormData object to hold the files for upload
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append("images", file);
        });

        // Send the images to your backend
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/assets/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Assuming your backend returns the image URLs in the response
        const imageUrls = response.data.imageUrls;
        dispatch(setImages(imageUrls));
      } catch (error) {
        console.error("Error uploading images:", error);
        // Handle the error appropriately
      }
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center bg-gray-100 border border-gray-300 border-dashed p-4 rounded-xl"
    >
      <input {...getInputProps()} />
      <div className="mb-4 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <PhotoIcon className="h-6 w-6 text-gray-500" />
      </div>
      <p className=" w-72 text-gray-500 text-sm text-center">
        Drag & drop concept images here, or click to select files
      </p>
    </div>
  );
};

export default ConceptImageUploader;

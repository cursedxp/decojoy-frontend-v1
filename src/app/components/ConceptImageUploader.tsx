import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setImages } from "../../../store/conceptSlice";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/outline";

const ConceptImageUploader: React.FC = () => {
  const dispatch = useDispatch();
  const [previewImages, setPreviewImages] = useState<string[]>([]); // Stores image preview URLs
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Stores selected image files

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Add new files to the current list
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    // Generate and add new previews to the current previews
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);
  }, []);

  // Handle the image upload to the server
  const handleUpload = async () => {
    try {
      const accessToken = await getAccessToken(); // Get an access token
      const imageUrls = await uploadImagesToServer(accessToken); // Upload images to the server
      dispatch(setImages(imageUrls)); // Dispatch the uploaded image URLs to Redux store

      // Clear previews and selected files after successful upload
      clearSelection();
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // Get access token for the current user
  const getAccessToken = async (): Promise<string> => {
    const tokenResponse = await axios.get("/api/getAccessToken");
    if (!tokenResponse.data.accessToken) {
      throw new Error("Access token missing");
    }
    return tokenResponse.data.accessToken;
  };

  // Upload images to the backend server
  const uploadImagesToServer = async (
    accessToken: string
  ): Promise<string[]> => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

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
    return response.data.imageUrls; // Return the uploaded image URLs
  };

  // Clear the current selection of files and their previews
  const clearSelection = () => {
    setPreviewImages([]);
    setSelectedFiles([]);
  };

  // Remove a specific file and its preview from the current selection
  const removeFile = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, idx) => idx !== index));
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col w-1/2 justify-center gap-4">
      <div>
        <h3 className="text-lg font-medium">Upload Concept Photos</h3>
        <p className=" text-sm text-gray-500">
          Select files and click complete upload button to upload images to the
          server
        </p>
      </div>
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center bg-gray-50 border border-gray-300 border-dashed p-4 rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="flex items-center gap-4">
          <div className=" w-12 h-12 rounded-full flex justify-center items-center bg-gray-200">
            <PhotoIcon className="h-6 w-6 text-gray-500" />
          </div>
          <p className=" text-gray-500 text-sm text-center">
            <span>Drag & drop</span> concept images here, or click to select
            files
          </p>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {previewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Preview"
            className="mb-2 cursor-pointer rounded-xl"
            width={80}
            onClick={() => removeFile(index)} // Allow users to remove a selected image by clicking it
            title="Click to remove"
          />
        ))}
      </div>
      <div className=" self-end">
        {previewImages.length > 0 && (
          <button
            onClick={handleUpload} // Trigger the image upload process
            className="flex gap-2 items-center py-2 px-4 bg-sky-600 rounded-xl text-white text-sm shadow-sm"
          >
            Complete Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default ConceptImageUploader;

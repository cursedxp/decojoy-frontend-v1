import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ImageUploaderProps {
  onImagesSelected: (selectedImages: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected }) => {
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Generate preview image urls
      const newPreviewImageUrls = acceptedFiles.map((file: any) =>
        URL.createObjectURL(file)
      );

      // Update previewImageUrls state
      setPreviewImageUrls((prevPreviewImageUrls) => [
        ...prevPreviewImageUrls,
        ...newPreviewImageUrls,
      ]);

      // Inform the parent about the selected images
      onImagesSelected(acceptedFiles);
    },
    [onImagesSelected]
  );

  // Remove preview image when user clicks on it
  const removePreviewImage = (index: number) => {
    // Remove image from previewImageUrls state
    const newPreviewImageUrls = previewImageUrls.filter((_, i) => i !== index);
    setPreviewImageUrls(newPreviewImageUrls);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Select concept images</h3>
        <p className="text-sm text-gray-500">
          Upload images that best represent your concept
        </p>
      </div>
      <div
        {...getRootProps()}
        className="flex justify-center bg-gray-100 p-4 text-xs border-dashed border border-gray-300 rounded-xl"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 flex justify-center items-center rounded-full">
              <PhotoIcon className="w-4 h-4 text-gray-500" />
            </div>
            <p>
              <span className="font-medium underline">Drag and drop</span> files
              here, or click to select files
            </p>
          </div>
        )}
      </div>
      <div className="my-4 flex gap-4">
        {previewImageUrls.map((src, index) => (
          <div key={index} className="relative group">
            <img
              src={src}
              alt=""
              className="rounded-xl hover:opacity-80"
              onClick={() => removePreviewImage(index)}
              title="Click to remove image"
              width={96}
            />
            <div
              className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 bg-red-500 rounded-xl shadow-sm cursor-pointer"
              onClick={() => removePreviewImage(index)}
            >
              <TrashIcon className="w-4 h-4 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

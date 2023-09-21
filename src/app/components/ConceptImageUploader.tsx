import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

//TODO: upload images to servet and return image urls
//TODO: return image urls to thumbnail selector component
const ConceptImageUploader: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const dispatch = useDispatch();

  //onDrop is a callback function that will be called when a file is dropped
  const onDrop = useCallback((acceptedFiles: File[]) => {
    //update imageFiles state
    setImageFiles((prevImageFiles) => [...prevImageFiles, ...acceptedFiles]);

    //generate preview image urls
    const newPreviewImageUrls = acceptedFiles.map((file: any) => {
      return URL.createObjectURL(file);
    });

    //update previewImageUrls state
    setPreviewImageUrls((prevPreviewImageUrls) => [
      ...prevPreviewImageUrls,
      ...newPreviewImageUrls,
    ]);
  }, []);

  //remove preview image when user clicks on it
  const removePreviewImage = (index: number) => {
    //remove image from imageFiles state
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);

    //remove image from previewImageUrls state
    const newPreviewImageUrls = previewImageUrls.filter((_, i) => i !== index);
    setPreviewImageUrls(newPreviewImageUrls);
  };

  useEffect(() => {
    console.log(previewImageUrls);
  }, [previewImageUrls]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className=" max-w-xl">
      <div className=" my-4">
        <h3 className="text-lg font-medium">Select concept images</h3>
        <p className=" text-sm text-gray-500">
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
            <div className=" w-8 h-8 bg-gray-200 flex justify-center items-center rounded-full">
              <PhotoIcon className="w-4 h-4 text-gray-500" />
            </div>
            <p>
              <span className=" font-medium underline">Drag and drop</span>{" "}
              files here, or click to select files
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
              className="rounded-xl  hover:opacity-80"
              width={72}
              onClick={() => removePreviewImage(index)}
              title="Click to remove image"
            />
            {/* Initially hide the TrashIcon, and only show it when parent div is hovered */}
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

export default ConceptImageUploader;

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { on } from "events";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPreviewImageUrls = acceptedFiles.map((file: any) =>
        URL.createObjectURL(file)
      );
      setPreviewImageUrls((prevPreviewImageUrls) => [
        ...prevPreviewImageUrls,
        ...newPreviewImageUrls,
      ]);
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const removePreviewImage = (index: number) => {
    const newPreviewImageUrls = previewImageUrls.filter((_, i) => i !== index);
    setPreviewImageUrls(newPreviewImageUrls);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
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
              Drag and drop your files here or{" "}
              <span className="text-blue-500">browse</span>
            </p>
          </div>
        )}
      </div>
      {previewImageUrls.length !== 0 && (
        <div className="my-4 flex gap-4">
          {previewImageUrls.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt=""
                className="rounded-xl hover:opacity-80"
                title="Click to remove image"
                onClick={() => removePreviewImage(index)}
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
      )}
    </div>
  );
};
export default FileUploader;

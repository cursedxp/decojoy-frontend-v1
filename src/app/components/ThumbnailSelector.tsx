import React, { useState } from "react";

interface ThumbnailSelectorProps {
  uploadedImages: string[];
  onSelect: (imageUrl: string) => void;
}

const ThumbnailSelector: React.FC<ThumbnailSelectorProps> = ({
  uploadedImages = [], // Set a default value
  onSelect,
}) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    null
  );

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedThumbnail(imageUrl);
    onSelect(imageUrl); // Inform parent component of the selection
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {uploadedImages.map((imageUrl) => (
        <div
          key={imageUrl}
          className={`relative cursor-pointer border-2 ${
            selectedThumbnail === imageUrl
              ? "border-blue-500"
              : "border-transparent"
          }`}
          onClick={() => handleThumbnailClick(imageUrl)}
        >
          <img
            src={imageUrl}
            alt="Uploaded concept"
            className="object-cover w-32 h-32"
          />
          {selectedThumbnail === imageUrl && (
            <span className="absolute top-2.5 right-2.5 text-blue-500 text-xl">
              ✔
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThumbnailSelector;

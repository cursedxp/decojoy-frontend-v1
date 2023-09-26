import React, { useState } from "react";
import { CakeIcon, CheckIcon } from "@heroicons/react/24/outline";

interface ThumbnailSelectorProps {
  imageUrls: string[];
  onThumbnailSelected: (selectedImageUrl: string) => void;
}

const ThumbnailSelector: React.FC<ThumbnailSelectorProps> = ({
  imageUrls,
  onThumbnailSelected,
}) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    null
  );

  const handleThumbnailSelect = (imageUrl: string) => {
    setSelectedThumbnail(imageUrl);
    onThumbnailSelected(imageUrl);
  };

  return (
    <div className="max-w-xl">
      <div>
        <h3 className="text-lg font-medium">Select thumbnail image</h3>
        <p className="text-sm text-gray-500">
          Choose a thumbnail image that best represents your concept
        </p>
      </div>

      <div className="my-4 flex justify-center gap-4">
        {imageUrls.map((url, index) => {
          return (
            <div key={index} className=" relative group">
              <img
                src={url}
                width={96}
                alt="thumbnail"
                className={`object-cover border-2 rounded-xl cursor-pointer ${
                  selectedThumbnail === url
                    ? "border-sky-600 shadow-md"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailSelect(url)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ThumbnailSelector;

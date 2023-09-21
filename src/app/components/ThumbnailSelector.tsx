import React, { useState } from "react";
//TODO:get returned image urls from image uploader component
//TODO: set selected thumbnail image url to state
//TODO: return selected thumbnail image url to create concept form component
import { CakeIcon, CheckIcon } from "@heroicons/react/24/outline";

const sampleImageData = [
  "https://picsum.photos/72/72",
  "https://picsum.photos/72/73",
  "https://picsum.photos/72/74",
  "https://picsum.photos/72/75",
];

const ThumbnailSelector: React.FC = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    null
  );

  const handleThumbnailSelect = (imageUrl: string) => {
    setSelectedThumbnail(imageUrl);
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
        {sampleImageData.map((src, index) => {
          return (
            <div key={index} className=" relative group">
              <img
                src={src}
                width={96}
                alt="thumbnail"
                className={`object-cover border-2 rounded-xl cursor-pointer ${
                  selectedThumbnail === src
                    ? "border-sky-600 shadow-md"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailSelect(src)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ThumbnailSelector;

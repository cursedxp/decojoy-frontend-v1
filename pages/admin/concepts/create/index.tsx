import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConceptImageUploader from "../../../../src/app/components/ConceptImageUploader";
import { RootState } from "../../../../store/store";
import ThumbnailSelector from "../../../../src/app/components/ThumbnailSelector";

const CreateConcept: React.FC = () => {
  const images = useSelector((state: RootState) => state.concept.images); // Adjust the path according to your store structure

  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    null
  );

  const handleThumbnailSelection = (imageUrl: string) => {
    setSelectedThumbnail(imageUrl);
  };

  return (
    <div>
      <h1>Create New Concept</h1>
      <ConceptImageUploader />
      <ThumbnailSelector
        uploadedImages={images}
        onSelect={handleThumbnailSelection}
      />
    </div>
  );
};

export default CreateConcept;

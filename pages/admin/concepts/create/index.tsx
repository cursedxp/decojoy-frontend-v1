import React from "react";
import { useSelector } from "react-redux";
import ConceptImageUploader from "../../../../src/app/components/ConceptImageUploader";
import { RootState } from "../../../../store/store";
const CreateConcept: React.FC = () => {
  const images = useSelector((state: RootState) => state.concept.images); // Adjust the path according to your store structure

  return (
    <div>
      <h1>Create New Concept</h1>
      <ConceptImageUploader />
      {/* Other components and elements */}
    </div>
  );
};

export default CreateConcept;

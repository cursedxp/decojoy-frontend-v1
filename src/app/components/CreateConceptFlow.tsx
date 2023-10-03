import React, { useState, useRef } from "react";
import ImageUploader from "@/app/components/ImageUploader";
import ThumbnailSelector from "@/app/components/ThumbnailSelector";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setImages } from "../../../store/createConceptSlice";
import { CreateConceptFormData } from "@/app/components/ConceptForm";
import ConceptForm, { ConceptFormRef } from "@/app/components/ConceptForm";
import axios from "axios";

interface CreateConceptFlowProps {
  onConceptCreated: (message: string) => void;
  onClose: () => void;
}

const CreateConceptFlow: React.FC<CreateConceptFlowProps> = ({
  onConceptCreated,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    null
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const conceptFormRef = useRef<ConceptFormRef | null>(null);
  const [conceptDetails, setConceptDetails] =
    useState<CreateConceptFormData | null>(null);

  const API_ENDPOINT_FOR_IMAGES =
    process.env.NEXT_PUBLIC_API_URL + "/assets/upload";

  const API_ENDPOINT_FOR_NEW_CONCEPT =
    process.env.NEXT_PUBLIC_API_URL + "/concepts";

  const images = useSelector(
    (state: RootState) => state.conceptCreation.images
  );

  const handleThumbnailSelected = (imageUrl: string) => {
    setSelectedThumbnail(imageUrl);
  };

  const handleImagesSelected = (files: File[]) => {
    setSelectedImages(files);
  };

  const getUploadHeaders = (
    accessToken: string,
    data: FormData | CreateConceptFormData
  ): Record<string, string> => {
    let contentType = "multipart/form-data"; // Default for FormData
    if (!(data instanceof FormData)) {
      contentType = "application/json";
    }

    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": contentType,
    };
  };

  const prepareImageData = (selectedImages: File[]): FormData => {
    const formData = new FormData();
    selectedImages.forEach((file) => formData.append("images", file));
    return formData;
  };

  const uploadImages = async (
    accessToken: string,
    formData: FormData
  ): Promise<any> => {
    return await axios.post(API_ENDPOINT_FOR_IMAGES, formData, {
      headers: getUploadHeaders(accessToken, formData),
    });
  };

  const updateUIAfterUpload = (imageUrls: string[]): void => {
    dispatch(setImages(imageUrls));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleUploadClick = async (): Promise<void> => {
    if (currentStep !== 1) return;

    const accessToken = await getAccessToken();
    const formData = prepareImageData(selectedImages);

    try {
      const response = await uploadImages(accessToken, formData);
      const imageUrls = response.data.data.imageUrls;
      setUploadedImages(imageUrls);
      updateUIAfterUpload(imageUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const getAccessToken = async (): Promise<string> => {
    const tokenResponse = await axios.get("/api/getAccessToken");
    if (!tokenResponse.data.accessToken) {
      throw new Error("Access token missing");
    }
    return tokenResponse.data.accessToken;
  };

  const uploadFormData = async (
    accessToken: string,
    formData: CreateConceptFormData
  ): Promise<any> => {
    return await axios.post(API_ENDPOINT_FOR_NEW_CONCEPT, formData, {
      headers: getUploadHeaders(accessToken, formData),
    });
  };

  const handleParentButtonClick = async () => {
    if (currentStep !== 3) return;

    if (conceptFormRef.current) {
      const accessToken = await getAccessToken();
      console.log("accessToken", accessToken);
      const formData = conceptFormRef.current.getFormData();
      try {
        const response = await uploadFormData(accessToken, formData);
        onConceptCreated(response.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If there's an error message from the server, show it.
          console.error("Error details:", error.response?.data);
        } else {
          console.error("Unknown error:", error);
        }
      }
    }
    onClose();
  };

  return (
    <div className="flex flex-col justify-center">
      {currentStep === 1 && (
        <ImageUploader onImagesSelected={handleImagesSelected} />
      )}
      {currentStep === 2 && (
        <ThumbnailSelector
          imageUrls={images}
          onThumbnailSelected={handleThumbnailSelected}
        />
      )}

      {currentStep === 3 && (
        <ConceptForm
          thumbnail={selectedThumbnail}
          ref={conceptFormRef}
          images={uploadedImages}
        />
      )}

      <button
        className="w-32 py-2 px-4 bg-sky-600 rounded-xl text-white text-sm shadow-sm self-end "
        onClick={() => {
          if (currentStep === 1) {
            handleUploadClick();
          } else if (currentStep === 2) {
            // Check if a thumbnail has been selected
            if (selectedThumbnail) {
              setCurrentStep(3); // Move to the next step
            } else {
              console.warn("Please select a thumbnail before proceeding.");
            }
          }
          // Add logic for currentStep === 3 here
          else if (currentStep === 3) {
            handleParentButtonClick();
          }
        }}
      >
        {currentStep === 1 && "Upload"}
        {currentStep === 2 && "Next"}
        {currentStep === 3 && "Save Concept"}
      </button>
    </div>
  );
};

export default CreateConceptFlow;

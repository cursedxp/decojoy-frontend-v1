import React, { useState, useEffect } from "react";
import useGetRequest from "@/app/hooks/useGetRequest";
import { useRouter } from "next/router";

/*
    In this page user will be able to see the details of a concept.
    The details will be fetched from the API.
    The user will be able to edit the concept.
    The user will be able to create a new product and add it to the concept.
    The user will be able to add already existing products to the concept.
    The user will be able to publish or unpublish the concept.

*/

interface ConceptDetailsType {
  id: number;
  title: string;
  thumbnail: string;
  images: string[];
  description: string;
  price: number;
  status: string;
  style: string;
  type: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

const ConceptDetails: React.FC = () => {
  console.log("Component Loaded");
  const router = useRouter();
  const { id } = router.query;

  const [conceptDetails, setConceptDetails] = useState<
    ConceptDetailsType | null | any[]
  >(null);

  const { response, error, isLoading, sendGetRequest } = useGetRequest(
    id ? process.env.NEXT_PUBLIC_API_URL + `/concepts/${id}` : ""
  );

  useEffect(() => {
    if (id && !conceptDetails) {
      sendGetRequest();
    }
  }, [id, sendGetRequest, conceptDetails]);

  useEffect(() => {
    if (!isLoading && response) {
      setConceptDetails(response);
    } else if (error) {
      console.error("Error fetching concept details:", error);
    }
  }, [response, isLoading, error]);

  console.log("conceptDetails", conceptDetails);

  return (
    <div>
      Concept Details<br></br>
      <span>{id}</span>
    </div>
  );
};
export default ConceptDetails;

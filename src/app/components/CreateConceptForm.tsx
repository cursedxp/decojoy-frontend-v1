import React, { useState } from "react";

//get returned thumbnail image url from thumbnail selector component
//save concept details to database including thumbnail image url
//show success message and redirect to concept list page

const conceptStyles = [
  "MINIMALIST",
  "MODERN",
  "INDUSTRIAL",
  "ISCANDINAVIAN",
  "CONTEMPORARY",
  "MIDCENTURY",
  "ARTDECO",
  "TRADITIONAL",
  "BOHEMIAN",
  "ECLECTIC",
  "CLASSIC",
];

const roomTypes = [
  "KITCHEN",
  "LIVINGROOM",
  "BEDROOM",
  "DINING",
  "BATHROOM",
  "OFFICE",
  "STUDY",
  "ENTRYWAY",
  "LIBRARY",
  "NURSERY",
  "KIDSROOM",
];

//TODO:Add fromik to form and add validation
//TODO: Save concept details to database including thumbnail image url
const CreateConceptForm: React.FC = () => {
  return (
    <div className="max-w-xl">
      <div>
        <h3 className="text-lg font-medium">Concept details </h3>
        <p className="text-sm text-gray-500">
          Enter details about your concept
        </p>
      </div>
      <div>
        <form className="mt-4 flex flex-col">
          <div>
            <label htmlFor="title" className=" text-xs font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full border border-gray-300 rounded-xl p-2 mt-2"
            ></input>
          </div>
          <div>
            <label htmlFor="description" className=" text-xs font-medium mt-4">
              Description
            </label>
            <textarea
              id="description"
              className="block w-full border border-gray-300 rounded-xl p-2 mt-2"
            ></textarea>
          </div>
          <div>
            <label htmlFor="conceptStyle" className=" text-xs font-medium mt-4">
              Concept Style
            </label>
            <select className="block w-full border border-gray-300 rounded-xl p-2 mt-2">
              {conceptStyles.map((conceptStyles, index) => {
                return (
                  <option
                    key={index}
                    value={conceptStyles}
                    className="capitalize"
                  >
                    {conceptStyles.toLowerCase()}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="roomType" className=" text-xs font-medium mt-4">
              Room Type
            </label>
            <select className="block w-full border border-gray-500 rounded-xl p-2 mt-2">
              {roomTypes.map((roomTypes, index) => {
                return (
                  <option key={index} value={roomTypes} className="capitalize">
                    {roomTypes.toLowerCase()}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConceptForm;

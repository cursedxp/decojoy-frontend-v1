import React from "react";
import { v4 as uuidv4 } from "uuid";

interface CustomTableProps {
  data: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    style: string;
    status: string;
    type: string;
    createdAt: string;
  }[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  return (
    <div className="flex border border-gray-300 text-sm rounded-2xl  my-4 shadow-sm">
      <table className="min-w-full custom-table">
        <thead className=" bg-gray-200 border-b border-gray-300">
          <tr>
            <th className="py-3 px-6 text-left">Thumbnail</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Room Type</th>
            <th className="py-3 px-6 text-left">Style</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        {data.length === 0 && (
          <tbody className="text-gray-700">
            <tr>
              <td
                className="py-3 px-6 text-center  border-gray-300"
                colSpan={8}
              >
                No concepts found
              </td>
            </tr>
          </tbody>
        )}
        <tbody className="text-gray-700">
          {data.map((concept) => {
            const newUUID = uuidv4();
            return (
              <tr key={newUUID}>
                <td className="py-3 px-6 border-gray-300">
                  <img
                    src={concept.thumbnail}
                    alt="thumbnail"
                    width={56}
                    className=" rounded-md"
                  />
                </td>
                <td className="py-3 px-6  border-gray-300">{concept.title}</td>
                <td className="py-3 px-6  border-gray-300">
                  {concept.description}
                </td>
                <td className="py-3 px-6  border-gray-300">
                  {concept.type.charAt(0).toUpperCase() +
                    concept.type.slice(1).toLowerCase()}
                </td>
                <td className="py-3 px-6  border-gray-300">
                  {concept.style.charAt(0).toUpperCase() +
                    concept.style.slice(1).toLowerCase()}
                </td>
                <td className="py-3 px-6  border-gray-300">{concept.price}</td>
                <td className="py-3 px-6  border-gray-300">
                  {concept.createdAt}
                </td>
                <td className="py-3 px-6  border-gray-300">
                  <div className=" bg-orange-200 rounded-md text-center text-orange-400 p-0 border-2 border-orange-300">
                    {concept.status.charAt(0).toUpperCase() +
                      concept.status.slice(1).toLowerCase()}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

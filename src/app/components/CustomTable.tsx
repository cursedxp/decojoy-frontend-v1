import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import Image from "next/image";

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
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
  onUnPublish: (id: number) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  onDelete,
  onPublish,
  onUnPublish,
}) => {
  const formatDate = useCallback((date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("eu-EU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  console.log(data);

  return (
    <div className="flex border border-gray-300 text-sm rounded-2xl  my-4 shadow-sm">
      <table className="min-w-full custom-table bg-white">
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
            <th className="py-3 px-6 text-left"></th>
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
        <tbody className="text-gray-700 ">
          {data.map((concept) => {
            const newUUID = uuidv4();
            return (
              <tr key={newUUID}>
                <td className="py-3 px-6 border-gray-300">
                  <Image
                    src={concept.thumbnail}
                    alt="thumbnail"
                    width={56}
                    height={56}
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
                  {formatDate(concept.createdAt)}
                </td>
                <td className="py-3 px-6 border-gray-300">
                  <div
                    className={
                      (concept.status.toLowerCase() === "published"
                        ? "bg-green-300 rounded-xl "
                        : "bg-orange-300 rounded-xl ") + "w-4 h-4"
                    }
                  ></div>
                </td>

                <td className="py-3 px-6  border-gray-300">
                  <div className="flex gap-2">
                    <button
                      className=" hover:bg-red-100  text-red-500 font-bold p-2 rounded-xl"
                      onClick={() => onDelete(concept.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    {concept.status === "PUBLISHED" ? (
                      <button
                        className="  hover:bg-orange-100 text-orange-400 p-2 rounded-xl"
                        onClick={() => onUnPublish(concept.id)}
                      >
                        <EyeSlashIcon className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        className="  hover:bg-green-100 text-green-700 p-2 rounded-xl"
                        onClick={() => onPublish(concept.id)}
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    )}
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

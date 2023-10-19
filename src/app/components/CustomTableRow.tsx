import React, { useCallback } from "react";
import Image from "next/image";
import { TrashIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import CustomTableActions from "./CustomTableActions";
interface CustomTableProps {
  concept: {
    thumbnail?: string;
    title?: string;
    description?: string;
    type?: string;
    style?: string;
    price?: number;
    createdAt?: string;
    status?: string;
    id?: string;
  };
}

const CustomTableRow: React.FC<CustomTableProps> = ({ concept }) => {
  const formatDate = useCallback((date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("eu-EU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);
  return (
    <tr>
      <td className="py-3 px-6 border-gray-300">
        {concept.thumbnail && (
          <Image
            src={concept.thumbnail}
            alt="thumbnail"
            width={56}
            height={56}
            className=" rounded-md"
          />
        )}
      </td>

      <td className="py-3 px-6  border-gray-300">{concept.title}</td>
      {concept.description && (
        <td className="py-3 px-6  border-gray-300">{concept.description}</td>
      )}
      {concept.type && (
        <td className="py-3 px-6  border-gray-300">
          {concept.type.charAt(0).toUpperCase() +
            concept.type.slice(1).toLowerCase()}
        </td>
      )}
      {concept.style && (
        <td className="py-3 px-6  border-gray-300">
          {concept.style.charAt(0).toUpperCase() +
            concept.style.slice(1).toLowerCase()}
        </td>
      )}
      {concept.price && (
        <td className="py-3 px-6  border-gray-300">{concept.price}</td>
      )}

      {concept.createdAt && (
        <td className="py-3 px-6  border-gray-300">
          {formatDate(concept.createdAt)}
        </td>
      )}
      {concept.status && (
        <td className="py-3 px-6 border-gray-300">
          <div
            className={
              (concept.status.toLowerCase() === "published"
                ? "bg-green-300 rounded-xl "
                : "bg-orange-300 rounded-xl ") + "w-4 h-4"
            }
          ></div>
        </td>
      )}

      <td className="py-3 px-6  border-gray-300">
        {/* <CustomTableActions conceptId={concept.id} status={concept.status} /> */}
      </td>
    </tr>
  );
};
export default CustomTableRow;

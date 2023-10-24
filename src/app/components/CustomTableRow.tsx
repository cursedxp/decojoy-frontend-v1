import React, { useCallback } from "react";
import Image from "next/image";
import { TrashIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { on } from "events";
interface CustomTableProps {
  item: {
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
  onRemove?: (id: string | undefined) => void;
  onPublish?: (id: string | undefined) => void;
  onUnPublish?: (id: string | undefined) => void;
}

const CustomTableRow: React.FC<CustomTableProps> = ({
  item,
  onRemove,
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
  return (
    <tr>
      <td className="py-3 px-6 border-gray-300">
        {item.thumbnail && (
          <Image
            src={item.thumbnail}
            alt="thumbnail"
            width={56}
            height={56}
            className=" rounded-md"
          />
        )}
      </td>

      <td className="py-3 px-6  border-gray-300">{item.title}</td>
      {item.description && (
        <td className="py-3 px-6  border-gray-300">{item.description}</td>
      )}
      {item.type && (
        <td className="py-3 px-6  border-gray-300">
          {item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase()}
        </td>
      )}
      {item.style && (
        <td className="py-3 px-6  border-gray-300">
          {item.style.charAt(0).toUpperCase() +
            item.style.slice(1).toLowerCase()}
        </td>
      )}
      {item.price && (
        <td className="py-3 px-6  border-gray-300">{item.price}</td>
      )}

      {item.createdAt && (
        <td className="py-3 px-6  border-gray-300">
          {formatDate(item.createdAt)}
        </td>
      )}
      {item.status && (
        <td className="py-3 px-6 border-gray-300">
          <div
            className={
              (item.status.toLowerCase() === "published"
                ? "bg-green-300 rounded-xl "
                : "bg-orange-300 rounded-xl ") + "w-4 h-4"
            }
          ></div>
        </td>
      )}
      <td className="py-3 px-6  border-gray-300">
        <div className="flex gap-2">
          <button
            className=" hover:bg-red-100  text-red-500 font-bold p-2 rounded-xl"
            onClick={() => {
              if (onRemove) {
                onRemove(item.id);
              }
            }}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          {item.status === "PUBLISHED" ? (
            <button
              className="hover:bg-orange-100 text-orange-400 p-2 rounded-xl"
              onClick={() => {
                if (onUnPublish) {
                  onUnPublish(item.id);
                }
              }}
            >
              <EyeSlashIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              className="hover:bg-green-100 text-green-700 p-2 rounded-xl"
              onClick={() => {
                if (onPublish) {
                  onPublish(item.id);
                }
              }}
            >
              <EyeIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
export default CustomTableRow;

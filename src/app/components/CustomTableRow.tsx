import React, { useCallback } from "react";
import Image from "next/image";
import { TrashIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { on } from "events";
import Link from "next/link";
import { useRouter } from "next/router";

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
    id?: number;
  };
  contentUrl: string;
  onRemove?: (id: number) => void;
  onPublish?: (id: number) => void;
  onUnPublish?: (id: number) => void;
}

const CustomTableRow: React.FC<CustomTableProps> = ({
  item,
  onRemove,
  onPublish,
  onUnPublish,
  contentUrl,
}) => {
  const router = useRouter();

  const formatDate = useCallback((date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("eu-EU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  const handleRowClick = useCallback(() => {
    router.push(`/admin/${contentUrl}/${item.id}`);
  }, [item.id, contentUrl]);

  return (
    <tr
      onClick={() => {
        handleRowClick();
      }}
      className="hover:bg-gray-200 cursor-pointer"
    >
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
      {item.price !== null && item.price !== undefined && (
        <td className="py-3 px-6 border-gray-300">{item.price}</td>
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
        <div className="flex gap-2 ">
          <button
            className=" hover:bg-red-100  text-red-500 font-bold p-2 rounded-xl"
            onClick={(event) => {
              event.stopPropagation();
              if (item.id && onRemove) {
                onRemove(item.id);
              }
            }}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          {item.status && (
            <div>
              {item.status === "PUBLISHED" ? (
                <button
                  className="hover:bg-orange-100 text-orange-400 p-2 rounded-xl"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (item.id && onUnPublish) {
                      onUnPublish(item.id);
                    }
                  }}
                >
                  <EyeSlashIcon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  className="hover:bg-green-100 text-green-700 p-2 rounded-xl"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (item.id && onPublish) {
                      onPublish(item.id);
                    }
                  }}
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
export default CustomTableRow;

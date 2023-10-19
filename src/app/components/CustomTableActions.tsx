import React from "react";
import { TrashIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
interface CustomTableActionProps {
  conceptId?: string;
  status?: string;
}

const CustomTableActions: React.FC<CustomTableActionProps> = ({
  conceptId,
  status,
}) => {
  return (
    <div className="flex gap-2">
      <button
        className=" hover:bg-red-100  text-red-500 font-bold p-2 rounded-xl"
        onClick={() => {
          if (onDelete) {
            onDelete(conceptId);
          }
        }}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
      {status &&
        (status === "PUBLISHED" ? (
          <button
            className="hover:bg-orange-100 text-orange-400 p-2 rounded-xl"
            onClick={() => {
              if (onUnPublish) {
                onUnPublish(conceptId);
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
                onPublish(conceptId);
              }
            }}
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        ))}
    </div>
  );
};
export default CustomTableActions;

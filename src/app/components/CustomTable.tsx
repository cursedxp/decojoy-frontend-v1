import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import CustomTableRow from "./CustomTableRow";

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
          {data.map((item) => {
            const uniqKey = uuidv4();
            return <CustomTableRow key={uniqKey} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

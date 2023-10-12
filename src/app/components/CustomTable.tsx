import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomTableHead from "./CustomTableHead";
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
  columns: string[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data, columns }) => {
  return (
    <div className="flex border border-gray-300 text-sm rounded-2xl  my-4 shadow-sm">
      <table className="min-w-full custom-table bg-white">
        <CustomTableHead columns={columns} />
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

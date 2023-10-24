import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomTableHead from "./CustomTableHead";
import CustomTableRow from "./CustomTableRow";

interface CustomTableProps {
  concepts: object[];
  columns: string[];
  onRemove?: (id: number) => Promise<any>;
  onPublish?: (id: number) => Promise<any>;
  onUnpublish?: (id: number) => Promise<any>;
}

const CustomTable: React.FC<CustomTableProps> = ({
  concepts,
  columns,
  onRemove,
  onPublish,
  onUnpublish,
}) => {
  return (
    <div className="flex border border-gray-300 text-sm rounded-2xl  my-4 shadow-sm">
      <table className="min-w-full custom-table bg-white">
        <CustomTableHead columns={columns} />
        {concepts.length === 0 && (
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
          {concepts.map((concept) => {
            const key = uuidv4();
            return (
              <CustomTableRow
                key={key}
                item={concept}
                onRemove={onRemove}
                onPublish={onPublish}
                onUnPublish={onUnpublish}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

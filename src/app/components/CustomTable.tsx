import React from "react";

const CustomTable: React.FC = ({}) => {
  return (
    <div className="flex border border-gray-300 text-sm rounded-2xl  my-4 shadow-sm">
      <table className="min-w-full custom-table">
        <thead className=" bg-gray-200 border-b border-gray-300">
          <tr>
            <th className="py-3 px-6 text-left">Header 1</th>
            <th className="py-3 px-6 text-left">Header 2</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr>
            <td className="py-3 px-6 border-b border-gray-300">
              Row 1, Column 1
            </td>
            <td className="py-3 px-6 border-b border-gray-300">
              Row 1, Column 2
            </td>
          </tr>
          <tr>
            <td className="py-3 px-6">Row 2, Column 1</td>
            <td className="py-3 px-6">Row 2, Column 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

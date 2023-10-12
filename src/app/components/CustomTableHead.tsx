import React from "react";

interface CustomTableHeadProps {
  columns: string[];
}

const CustomTableHead: React.FC<CustomTableHeadProps> = ({ columns = [] }) => {
  return (
    <thead>
      <tr>
        {columns?.map((column) => {
          return (
            <th key={column} className="py-3 px-6 text-left">
              {column}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CustomTableHead;

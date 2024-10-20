import React from "react";

// Define a generic type for the data
type DataItem = Record<string, string | number | boolean>;

interface SortableTableProps<T extends DataItem> {
  headers: { key: keyof T; label: string }[]; // Table headers
  data: T[]; // Data for the table rows
  onSort: (key: keyof T) => void; // Pass sorting handler from parent component
  sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null; // Current sorting configuration
  onRowClick?: (row: T) => void; // Optional row click handler for details view
}

const SortableTable = <T extends DataItem>({
  headers,
  data,
  onSort,
  sortConfig,
  onRowClick,
}: SortableTableProps<T>): React.ReactElement => (
  <table className="table-auto w-full">
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={String(header.key)}
            onClick={() => onSort(header.key)}
            className="cursor-pointer"
          >
            {header.label}
            {sortConfig?.key === header.key &&
              (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr
          key={i}
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => onRowClick?.(row)}
        >
          {headers.map((header) => (
            <td key={String(header.key)}>{row[header.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default SortableTable;
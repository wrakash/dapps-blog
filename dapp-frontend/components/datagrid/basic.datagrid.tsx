import React, { useEffect } from "react";
import { useTable } from "react-table";

function DataGrid({ columns, data }: any) {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="shadow overflow-x-auto sm:rounded-lg">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-[#EEEEEE]">
          {headerGroups.map((headerGroup: any, index: number) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column: any, index2: number) => (
                <th
                  scope="col"
                  className="group px-4 sm:px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  {...column.getHeaderProps()}
                  key={index2}
                >
                  <div className="flex items-center justify-between">
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell: any, index: number) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 sm:px-6 py-4 whitespace-nowrap"
                    role="cell"
                    key={index}
                  >
                    {cell.column.Cell.name === "defaultRenderer" ? (
                      <div className="text-sm text-gray-500">
                        {cell.render("Cell")}
                      </div>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;

import { flexRender } from "@tanstack/react-table";
import React from "react";
import EmptyRow from "./EmptyRow";

const DataRow = ({ data = [], table }) => {
  return (
    <>
      {data?.length > 0 ? (
        table?.getRowModel()?.rows?.map((row) => (
          <tr key={row.id}>
            {row?.getVisibleCells()?.map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <EmptyRow />
      )}
    </>
  );
};

export default DataRow;

import { flexRender } from "@tanstack/react-table";
import React from "react";
import EmptyRow from "./EmptyRow";
import { Fragment } from "react";

const DataRowCollapse = ({ data = [], table, renderSubComponent }) => {
  return (
    <>
      {data?.length > 0 ? (
        table?.getRowModel()?.rows?.map((row) => (
          <Fragment key={row.id}>
            <tr>
              {row?.getVisibleCells()?.map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && (
              <tr>
                <td colSpan={row.getVisibleCells()?.length}>
                  {renderSubComponent({ row })}
                </td>
              </tr>
            )}
          </Fragment>
        ))
      ) : (
        <EmptyRow />
      )}
    </>
  );
};

export default DataRowCollapse;

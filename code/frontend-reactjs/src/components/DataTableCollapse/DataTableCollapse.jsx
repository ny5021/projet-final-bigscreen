import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
} from "@tanstack/react-table";
import EmptyRow from "./EmptyRow";
import DataRowCollapse from "./DataRowCollapse";
import DefaultRowLoader from "../DefaultRowLoader/DefaultRowLoader";

const DataTableCollapse = ({
  columns,
  data,
  isLoading,
  expanded = {},
  setExpanded = () => {},
  renderSubComponent = ({ row }) => <div>Render subRowComponent here</div>,
  RowRenderLoader = DefaultRowLoader,
  ...props
}) => {
  const COLUMNS = React.useMemo(() => (columns ? columns : []), [columns]);
  const DATA = React.useMemo(() => (data ? data : []), [data]);

  const table = useReactTable({
    data: DATA,
    columns: COLUMNS,
    state: {
      expanded: expanded,
    },
    getCanExpand: true,

    getCoreRowModel: getCoreRowModel(),
    getSubRows: (rows) => rows.subRows,
    getExpandedRowModel: getExpandedRowModel(),
    manualExpanding: true,
    manualPagination: true,
  });
  const TABLE_CLASS = `${props?.className} table table-hover`;

  return (
    <table className={TABLE_CLASS}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {isLoading ? (
          <RowRenderLoader columnsTotalCount={table.getLeafHeaders().length} />
        ) : (
          <DataRowCollapse
            table={table}
            data={DATA}
            renderSubComponent={renderSubComponent}
          />
        )}
      </tbody>
    </table>
  );
};

export default DataTableCollapse;

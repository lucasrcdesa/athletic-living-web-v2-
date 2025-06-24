import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import "./styles.css";

interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
  pageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  onRowClick,
  emptyMessage = "Nenhum dado encontrado",
  pageSize = 10,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  // Converter as colunas para o formato do react-table
  const tableColumns: ColumnDef<any>[] = columns.map((col) => ({
    accessorKey: col.key,
    header: col.label,
    cell: ({ row, getValue }) => {
      const value = getValue();
      return col.render ? col.render(value, row.original) : value;
    },
    enableSorting: col.sortable !== false,
  }));

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row.original);
    }
  };

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <h3 className="data-table-title">{title}</h3>
        <div className="data-table-actions">
          <button className="btn-primary">Adicionar</button>
        </div>
      </div>

      <div className="data-table-filters">
        <input
          className="filter-input"
          placeholder="Buscar em todos os campos..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <div className="filter-info">
          {table.getFilteredRowModel().rows.length} de {data.length} registros
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={header.column.getCanSort() ? "sortable" : ""}
                    style={{
                      width: columns.find((col) => col.key === header.id)
                        ?.width,
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <span className="sort-indicator">
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? " ↕️"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  className={onRowClick ? "clickable" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="empty-message">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="data-table-pagination">
        <div className="pagination-info">
          <span>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <span>
            Mostrando{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            a{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            de {table.getFilteredRowModel().rows.length} resultados
          </span>
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>

          <div className="page-numbers">
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
              (pageIndex) => (
                <button
                  key={pageIndex}
                  className={`page-btn ${
                    pageIndex === table.getState().pagination.pageIndex
                      ? "active"
                      : ""
                  }`}
                  onClick={() => table.setPageIndex(pageIndex)}
                >
                  {pageIndex + 1}
                </button>
              )
            )}
          </div>

          <button
            className="pagination-btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

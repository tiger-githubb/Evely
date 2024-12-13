"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { TableSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CustomDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  filterPlaceholder?: string;
  showColumnVisibility?: boolean;
  showPagination?: boolean;
  showFilterInput?: boolean;
  rowsPerPage?: number;
  noResultsMessage?: string;
  totalLabel?: string;
  customSkeleton?: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  errorMessage?: string;
  density?: "compact" | "normal" | "spacious";
}

export function CustomDataTable<TData, TValue>({
  columns,
  data,
  filterColumn = "name",
  filterPlaceholder = "Filter...",
  showColumnVisibility = true,
  showPagination = true,
  showFilterInput = true,
  rowsPerPage = 10,
  noResultsMessage = "No results found",
  totalLabel = "row(s)",
  customSkeleton,
  isLoading,
  error = null,
  errorMessage = "Une erreur est survenue lors du chargement des données.",
  density = "normal",
}: CustomDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableDensity, setTableDensity] = React.useState(density);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    table.setPageSize(rowsPerPage);
  }, [rowsPerPage, table]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        table.nextPage();
      } else if (e.key === "ArrowUp") {
        table.previousPage();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  const tableStyles = cn("w-full", {
    "table-compact [&_td]:py-1 [&_th]:py-1": tableDensity === "compact",
    "table-normal [&_td]:py-3 [&_th]:py-3": tableDensity === "normal",
    "table-spacious [&_td]:py-4 [&_th]:py-4": tableDensity === "spacious",
  });
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      const totalColumnsWidth = columns.reduce((acc, col) => acc + (col.size || 150), 0);
      if (totalColumnsWidth > container.clientWidth) {
        container.style.overflowX = "auto";
      }
    }
  }, [columns]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        {showFilterInput && (
          <Input
            placeholder={filterPlaceholder}
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
            className="w-full sm:max-w-sm"
          />
        )}
        {showColumnVisibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* Density toggle */}
        {!density && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Density <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem checked={tableDensity === "compact"} onCheckedChange={() => setTableDensity("compact")}>
                Compact
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={tableDensity === "normal"} onCheckedChange={() => setTableDensity("normal")}>
                Normal
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={tableDensity === "spacious"} onCheckedChange={() => setTableDensity("spacious")}>
                Spacious
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div ref={tableContainerRef} className="rounded-md border max-w-[calc(100vw-4rem)]">
        <div className="overflow-x-auto">
          <Table className={tableStyles}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap"
                      style={{ width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : "auto" }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-lg font-medium">⚠️</p>
                      <p className="text-muted-foreground">{errorMessage}</p>
                      <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-2">
                        Réessayer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="p-0">
                    {customSkeleton || <TableSkeleton columns={columns.length} rows={5} />}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-lg font-medium">🔍</p>
                      <p className="text-muted-foreground">{noResultsMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <span className="mx-2">•</span>
            <span>
              {table.getFilteredRowModel().rows.length} {totalLabel}
            </span>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

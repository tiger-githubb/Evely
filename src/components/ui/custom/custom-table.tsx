"use client";

import { ColumnDef, VisibilityState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";

import { TableSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// Error Boundary Component
class TableErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h3>Something went wrong with the table display.</h3>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  enableDensityToggle?: boolean;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
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
  isLoading = false,
  error = null,
  errorMessage = "An error occurred while loading the data.",
  density = "normal",
  enableDensityToggle = false,
  totalItems,
  currentPage = 1,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
}: CustomDataTableProps<TData, TValue>) {
  if (rowsPerPage < 1) {
    console.warn("rowsPerPage must be greater than 0. Using default value of 10.");
    rowsPerPage = 10;
  }

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableDensity, setTableDensity] = React.useState(density);
  const [filterValue, setFilterValue] = React.useState("");

  const debouncedFilterValue = useDebounce(filterValue, 300);

  const memoizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,

    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    pageCount: totalItems ? Math.ceil(totalItems / pageSize) : -1,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex: currentPage - 1, pageSize });
        onPageChange?.(newState.pageIndex + 1);
      }
    },
  });

  React.useEffect(() => {
    table.setPageSize(rowsPerPage);
  }, [rowsPerPage, table]);

  React.useEffect(() => {
    table.getColumn(filterColumn)?.setFilterValue(debouncedFilterValue);
  }, [debouncedFilterValue, filterColumn, table]);

  const tableStyles = cn("w-full", {
    "table-compact [&_td]:py-1 [&_th]:py-1": tableDensity === "compact",
    "table-normal [&_td]:py-3 [&_th]:py-3": tableDensity === "normal",
    "table-spacious [&_td]:py-4 [&_th]:py-4": tableDensity === "spacious",
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  React.useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      const totalColumnsWidth = columns.reduce((acc, col) => acc + (col.size || 150), 0);
      if (totalColumnsWidth > container.clientWidth) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }
  }, [columns]);

  const paginationControls = (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2">
        <select value={pageSize} onChange={(e) => onPageSizeChange?.(Number(e.target.value))} className="border rounded p-1">
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">
          {totalItems || 0} {totalLabel}
        </span>
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= Math.ceil((totalItems || 0) / pageSize)}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
  return (
    <TableErrorBoundary>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
          {showFilterInput && (
            <Input
              placeholder={filterPlaceholder}
              value={filterValue}
              onChange={(event) => setFilterValue(event.target.value)}
              className="w-full sm:max-w-sm"
              aria-label="Filter table content"
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
          {enableDensityToggle && (
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

        <div
          ref={tableContainerRef}
          className={cn("rounded-md border", {
            "overflow-x-auto": isOverflowing,
            "max-w-[calc(100vw-4rem)]": true,
          })}
        >
          <div>
            <Table className={tableStyles} aria-label="Data table" role="grid">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} role="row">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="whitespace-nowrap"
                        style={{
                          width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : "auto",
                        }}
                        role="columnheader"
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
                          Retry
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
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} role="row">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-nowrap" role="cell">
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

        {showPagination && paginationControls}
      </div>
    </TableErrorBoundary>
  );
}

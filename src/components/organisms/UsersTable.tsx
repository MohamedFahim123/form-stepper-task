"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  Eye,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Input } from "@/components/atoms/Input";
import type { User } from "@/types/UserTypes";

type UsersTableProps = {
  users: User[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
};

export default function UsersTable({
  users,
  isLoading,
  isError,
  onRetry,
}: UsersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const columns = useMemo<ColumnDef<User>[]>(() => getColumns(), []);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: userGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const filteredCount = table.getFilteredRowModel().rows.length;
  const pageCount = Math.max(table.getPageCount(), 1);
  const pageIndex = table.getState().pagination.pageIndex;
  const paginationDisabled = isLoading || isError || filteredCount === 0;

  useEffect(() => {
    table.setPageIndex(0);
  }, [globalFilter, table]);

  useEffect(() => {
    if (pageIndex >= pageCount) {
      table.setPageIndex(0);
    }
  }, [pageIndex, pageCount, table]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-body-sm text-muted-foreground">
            {users.length} total {users.length === 1 ? "user" : "users"}
            {globalFilter && !isLoading && !isError
              ? `, ${filteredCount} matching`
              : ""}
          </p>
        </div>
        <label className="relative block w-full sm:max-w-[320px]">
          <span className="sr-only">Search users</span>
          <Search
            size={16}
            aria-hidden
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search by name, email, category..."
            className="pl-10"
            id="user-search"
            name="user-search"
            autoComplete="off"
            disabled={isLoading || isError}
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-surface shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-body-sm">
            <thead className="bg-slate-50 text-caption text-slate-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4 font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading && <UsersTableSkeleton />}
              {isError && !isLoading && (
                <TableState
                  title="Could not load users"
                  message="Please try again in a moment."
                  action={
                    onRetry ? <Button onClick={onRetry}>Retry</Button> : null
                  }
                />
              )}
              {!isLoading &&
                !isError &&
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-border transition hover:bg-slate-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              {!isLoading && !isError && !table.getRowModel().rows.length && (
                <TableState
                  title="No users found"
                  message={
                    globalFilter
                      ? "Try a different search term."
                      : "Add a user to start building the directory."
                  }
                />
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-caption text-muted-foreground">
            Page {paginationDisabled ? 1 : pageIndex + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-2">
            <IconButton
              label="First page"
              disabled={paginationDisabled || !table.getCanPreviousPage()}
              onClick={() => table.firstPage()}
            >
              <ChevronsLeft size={16} />
            </IconButton>
            <Button
              variant="secondary"
              disabled={paginationDisabled || !table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={paginationDisabled || !table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
            <IconButton
              label="Last page"
              disabled={paginationDisabled || !table.getCanNextPage()}
              onClick={() => table.lastPage()}
            >
              <ChevronsRight size={16} />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function getColumns(): ColumnDef<User>[] {
  return [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <SortableHeader
          label="Name"
          sorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-50 font-semibold text-primary-700">
            {getInitials(row.original.fullName)}
          </span>
          <div>
            <p className="font-medium text-slate-900">
              {row.original.fullName}
            </p>
            <p className="text-caption text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category.name",
      header: ({ column }) => (
        <SortableHeader
          label="Category"
          sorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => row.original.category?.name || "-",
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <SortableHeader
          label="Age"
          sorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <SortableHeader
          label="Created"
          sorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "status",
      header: "Status",
      cell: () => <span className="badge">Active</span>,
      enableSorting: false,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-1">
          <IconButton label="View user">
            <Eye size={16} />
          </IconButton>
          <IconButton label="Edit user">
            <Pencil size={16} />
          </IconButton>
          <IconButton label="Delete user" className="text-danger">
            <Trash2 size={16} />
          </IconButton>
        </div>
      ),
      enableSorting: false,
    },
  ];
}

type SortableHeaderProps = {
  label: string;
  sorted: false | "asc" | "desc";
  onClick: () => void;
};

function SortableHeader({ label, sorted, onClick }: SortableHeaderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-sm text-left font-semibold transition hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600/30"
    >
      {label}
      <span className="text-slate-500">
        {sorted === "asc" && (
          <ChevronUp size={14} aria-label="sorted ascending" />
        )}
        {sorted === "desc" && (
          <ChevronDown size={14} aria-label="sorted descending" />
        )}
        {!sorted && (
          <ChevronDown size={14} aria-hidden className="opacity-40" />
        )}
      </span>
    </button>
  );
}

function UsersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-t border-border">
          <td colSpan={6} className="px-6 py-4">
            <div className="h-6 animate-pulse rounded-md bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

function TableState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <tr className="border-t border-border">
      <td colSpan={6} className="px-6 py-12 text-center">
        <div className="mx-auto flex max-w-[360px] flex-col items-center gap-3">
          <p className="text-body font-semibold text-slate-900">{title}</p>
          <p className="text-body-sm text-muted-foreground">{message}</p>
          {action}
        </div>
      </td>
    </tr>
  );
}

function getInitials(name: string) {
  return (name || "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function userGlobalFilter(
  row: Row<User>,
  _columnId: string,
  filterValue: string,
) {
  const searchValue = filterValue.trim().toLowerCase();

  if (!searchValue) return true;

  const user = row.original;
  const searchableText = [
    user.fullName,
    user.email,
    user.gender,
    user.country?.name,
    user.category?.name,
    user.age?.toString(),
    user.interests?.map((interest) => interest.name).join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(searchValue);
}

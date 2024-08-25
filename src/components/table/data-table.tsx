'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  TableOptions,
  Updater,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { DataTableViewOptions } from './data-table-view-options';
import { useEffect, useState } from 'react';
import DataTableDeleteButton from './data-table-delete';
import DataTableAddButton, { AddButtonProps } from './data-table-add-button';
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue, IdType> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getIdFromRow: (row: TData) => IdType;
  tableOptions?: Omit<
    TableOptions<TData>,
    'data' | 'columns' | 'getCoreRowModel'
  >;
  selectable?: boolean;
  onSearch: (search: string) => void;

}

export function DataTable<TData, TValue, IdType>({
                                                   columns,
                                                   data,
                                                   getIdFromRow,
                                                   tableOptions,
                                                   selectable,
                                                   onSearch,
                                                 }: DataTableProps<TData, TValue, IdType>) {
  const [sort, setSort] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSort,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting: sort,
      columnFilters,
      columnVisibility,
    },
    manualPagination: true,
    ...tableOptions,
  });


  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          // value={(table.getColumn(filterCol)?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            onSearch(event.target.value);
            }
          }
          className="max-w-sm"
        />

        {/*<DataTableDeleteButton*/}
        {/*  table={table}*/}
        {/*  onDelete={onDelete}*/}
        {/*  getIdFromRow={getIdFromRow}*/}
        {/*/>*/}

        {/*<DataTableAddButton {...addButtonProps} />*/}

        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DataTablePagination
          selectable={selectable}
          table={table} />
      </div>
    </div>
  );
}

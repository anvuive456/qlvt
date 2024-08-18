'use client';
import { DataTable } from '@/components/table/data-table';
import { useEffect, useState } from 'react';
import { columns } from '@/app/admin/users/_reusable/columns';
import { User } from '@/model/user';
import { useSearchUsersQuery } from '@/hooks/api/user';
import { toast } from 'sonner';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';

export default function Page() {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);
  const { data, error, isLoading } = useSearchUsersQuery({
    page: paginationState?.pageIndex || 0,
    size: paginationState.pageSize,
    ...filterState.reduce<{ [k: string]: string }>((acc, item) => {
      acc[item.id] = item.value as string;
      return acc;
    }, {}),
  });


  useEffect(() => {
    if (error) {
      toast.error(`Lỗi: ${JSON.stringify(error)}`);
    }
  }, [error]);
  return <>
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Người dùng</h2>
        </div>
        <DataTable
          tableOptions={{
            rowCount: data?.totalElements,
            pageCount: data?.totalPages,
            onPaginationChange: setPaginationState,
            onColumnFiltersChange: setFilterState,
            state: {
              columnFilters: filterState,
              pagination: paginationState,
            },
          }}
          onDelete={ids => {

          }}
          getIdFromRow={row => row.id}
          filterCol="tenDayDu"
          columns={columns} data={data?.content || []} />
      </div>

    </div>

  </>;
}

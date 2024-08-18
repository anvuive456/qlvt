'use client';
import { DataTable } from '@/components/table/data-table';
import { useEffect, useState } from 'react';
import { columns } from '@/app/admin/departments/_reusable/columns';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useSearchUsersQuery } from '@/hooks/api/user';
import { useSearchDepartmentsQuery } from '@/hooks/api/department';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);

  const { data, error, isLoading } =
    useSearchDepartmentsQuery({
      page: paginationState?.pageIndex || 0,
      size: paginationState.pageSize,
      ...filterState.reduce<{ [k: string]: string }>((acc, item) => {
        acc[item.id] = item.value as string;
        return acc;
      }, {}),
    });


  return <>
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Phòng ban</h2>
        </div>
        <Button onClick={()=> router.push('/admin/departments/create')}>Tạo phòng ban</Button>
        <div className=" ">
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
            filterCol="tenPhongBan"
            columns={columns}
            data={data?.content || []}
          />

        </div>
      </div>

    </div>
  </>;
}

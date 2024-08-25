'use client';
import { DataTable } from '@/components/table/data-table';
import { useEffect, useState } from 'react';
import { columns } from '@/app/admin/departments/_reusable/columns';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useSearchUsersQuery } from '@/hooks/api/user';
import { useDeleteDepartmentMutation, useSearchDepartmentsQuery } from '@/hooks/api/department';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [showDialog, setShowDialog] = useState(false);
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

  const [deleteDepartment, { isSuccess: deletedSuccess }] = useDeleteDepartmentMutation();
  useEffect(() => {
    if (deletedSuccess) {
      toast.success('Đã xoá thành công');
    }
  }, [deletedSuccess]);

  return <>
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Phòng ban</h2>
        </div>
        <Button onClick={() => router.push('/admin/departments/create')}>Thêm phòng ban</Button>
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

          getIdFromRow={row => row.id}
          onSearch={search => {
            setFilterState([{
              id: 'tenPhongBan',
              value: search,
            }]);
          }}
          columns={columns({
            onDelete: id => {
              setSelectedId(id);
              setShowDialog(true);
            },
            onDetail: id => {
              router.push(`/admin/departments/${id}`);
            },
          })}
          data={data?.content || []}
        />
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc xoá?</AlertDialogTitle>
              <AlertDialogDescription>
                Hành động này sẽ xoá dữ liệu và không thể khôi phục lại được.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={event => {
                if (selectedId) {
                  deleteDepartment({
                    id: selectedId,
                  });
                  setSelectedId(undefined);
                }
              }}>
                Xoá
              </AlertDialogAction>
              <AlertDialogCancel onClick={event => {
                setSelectedId(undefined);
              }}>Huỷ</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </>;
}

'use client';

import { columns } from '@/app/admin/properties/_reusable/columns';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { useRouter } from 'next/navigation';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useDeletePropertyMutation, useSearchPropertiesQuery } from '@/hooks/api/property';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [showDialog, setShowDialog] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);
  const { data } = useSearchPropertiesQuery({
    page: paginationState?.pageIndex || 0,
    size: paginationState.pageSize,
    ...filterState.reduce<{ [k: string]: string }>((acc, item) => {
      acc[item.id] = item.value as string;
      return acc;
    }, {}),
  });

  const [deleteProperty, { isSuccess: deletedSuccess, isError: deletedError }] = useDeletePropertyMutation();

  useEffect(() => {
    if (deletedSuccess) {
      toast.success(`Xoá thành công`);
    }
  }, [deletedSuccess]);

  useEffect(() => {
    if (deletedError) {
      toast.error(`Xoá không thành công`);
    }
  }, [deletedError]);
  return <>
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tài sản</h2>
        </div>
        <Button onClick={() => router.push('/admin/properties/create')}>Thêm tài sản</Button>
        <DataTable
          onDelete={ids => {
          }}
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
          filterCol="maTaiSan"
          columns={columns({
            onDetail: id => {
              router.push(`/admin/properties/${id}`);
            },
            onDelete: id => {
              setSelectedId(id);
              setShowDialog(true);
            },
          })} data={data?.content || []} />
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
                  deleteProperty({
                    id: selectedId,
                  });
                  setSelectedId(undefined);
                }
              }}>
                Xoá
              </AlertDialogAction>
              <AlertDialogCancel onClick={event => {
                setSelectedId(undefined);
              }}
              >
                Huỷ
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>

    </div>

  </>;
}

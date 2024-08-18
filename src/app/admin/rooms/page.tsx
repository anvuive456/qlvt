'use client';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/app/admin/rooms/_reusable/columns';
import { useDeleteRoomMutation, useSearchRoomsQuery } from '@/hooks/api/room';
import { useRouter } from 'next/navigation';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useSearchUsersQuery } from '@/hooks/api/user';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [showDialog, setShowDialog] = useState(false);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);
  const { data } = useSearchRoomsQuery({
    page: paginationState?.pageIndex || 0,
    size: paginationState.pageSize,
    ...filterState.reduce<{ [k: string]: string }>((acc, item) => {
      acc[item.id] = item.value as string;
      return acc;
    }, {}),
  });

  const [deleteRoom, { isSuccess: deletedSuccess, isError: deletedError }] = useDeleteRoomMutation()

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
          <h2 className="text-3xl font-bold tracking-tight">Phòng họp</h2>
        </div>
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
          filterCol="tenPhongHop"
          columns={columns({
            onDetail: id => {
              router.push(`/admin/rooms/${id}`);
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
                  deleteRoom({
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

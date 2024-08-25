'use client';

import { useState } from 'react';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/data-table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { columns } from '@/app/admin/tickets/@borrow_slip/_reusable/columns';
import { useSearchSlipsQuery, useUpdateSlipStatusMutation } from '@/hooks/api/slip';
import { SlipStatus, SlipStatusRequest } from '@/model/payload/slip-payload';

export default function Page() {
  const [action, setAction] = useState<{
    id: number;
    status: SlipStatus;
  }>();
  const [showDialog, setShowDialog] = useState(false);
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data } = useSearchSlipsQuery({
    page: paginationState?.pageIndex || 0,
    size: paginationState.pageSize,
    keyWord: search
  });

  const [updateStatus, updateResult] = useUpdateSlipStatusMutation();

  return <>
    <DataTable
      tableOptions={{
        rowCount: data?.totalElements,
        pageCount: data?.totalPages,
        onPaginationChange: setPaginationState,
        state: {
          pagination: paginationState,
        },
      }}
      getIdFromRow={row => row.id}
      onSearch={setSearch}
      columns={columns({
        onAccept: slip => {
          setAction({
            id: slip.id,
            status: SlipStatus.ACCEPTED
          })
        },
        onDeny: slip => {
          setAction({
            id: slip.id,
            status: SlipStatus.UNACCEPTED
          })
        },
      })} data={data?.content || []} />
    <AlertDialog open={!!action} onOpenChange={open => open ? null : setAction(undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc{action?.status == SlipStatus.UNACCEPTED ? ' Không' : ''} duyệt
            phiếu?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ không thể khôi phục lại được.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={event => {
            updateStatus({
              id: action!.id,
              status: SlipStatusRequest[action!.status],
            }).unwrap().then(value => {
              toast.success(`${action?.status == SlipStatus.UNACCEPTED ? 'Từ chối' : 'Duyệt'} phiếu thành công`);
            })
              .catch(reason => {
                toast.error('Cập nhập trạng thái không thành công')
              })
              .finally(() => setAction(undefined));
          }}>
            Xác nhận
          </AlertDialogAction>
          <AlertDialogCancel onClick={event => {
            setAction(undefined);
          }}
          >
            Huỷ
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </>;
}

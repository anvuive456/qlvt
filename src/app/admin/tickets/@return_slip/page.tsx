'use client';

import { useState } from 'react';
import { ReturnSlipStatus, ReturnSlipStatusRequest, SlipStatus, SlipStatusRequest } from '@/model/payload/slip-payload';
import { PaginationState } from '@tanstack/react-table';
import { useSearchSlipsQuery, useUpdateSlipStatusMutation } from '@/hooks/api/slip';
import { DataTable } from '@/components/table/data-table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useSearchReturnSlipsQuery, useUpdateReturnSlipStatusMutation } from '@/hooks/api/return-slip';
import { columns } from '@/app/admin/tickets/@return_slip/_reusable/columns';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMeQuery } from '@/hooks/api/auth';

const FormSchema = z.object({
  note: z.string(),
});

export default function Page() {
  const [action, setAction] = useState<{
    id: number;
    status: ReturnSlipStatus;
  }>();
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data } = useSearchReturnSlipsQuery({
    page: paginationState?.pageIndex || 0,
    size: paginationState.pageSize,
    // keyWord: search
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [updateStatus, updateResult] = useUpdateReturnSlipStatusMutation();

  const onSubmit = (values: z.infer<typeof FormSchema>) =>{

    console.log('form values',values)
    updateStatus({
      id: action!.id,
      status: ReturnSlipStatusRequest[action!.status],
      note: values.note,
    }).unwrap().then(value => {
      toast.success(`${action?.status == ReturnSlipStatus.OVERDUE ? 'Từ chối' : 'Duyệt'} phiếu thành công`);
    })
      .catch(reason => {
        toast.error('Cập nhập trạng thái không thành công');
      })
      .finally(() => {
        setAction(undefined);
        form.reset();
      });
  }
  const {data: me} = useMeQuery()

  if(me!.roles.includes('ROLE_ADMIN')){
    return <h1>Chỉ root admin được xem</h1>
  }
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
            status: ReturnSlipStatus.DONE,
          });
        },
        onDeny: slip => {
          setAction({
            id: slip.id,
            status: ReturnSlipStatus.OVERDUE,
          });
        },
      })} data={data?.content || []} />
    <AlertDialog open={!!action} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc{action?.status == ReturnSlipStatus.DONE ? '' : ' Không'} duyệt
            phiếu?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ không thể khôi phục lại được.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form id="hook-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField render={({ field }) => (
              <FormItem>
                <FormLabel>Ghi chú</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} name={'note'} />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogAction type={'submit'} form={'hook-form'} >
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

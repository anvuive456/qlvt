'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useCreateDepartmentMutation,
  useGetDetailDepartmentQuery,
  useUpdateDepartmentMutation,
} from '@/hooks/api/department';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useGetDetailRoomQuery, useUpdateRoomMutation } from '@/hooks/api/room';
import { RoomCondition, RoomConditionRequest, RoomStatus, RoomStatusRequest } from '@/model/payload/room-payload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const FormSchema = z.object({
  name: z.string(),
  status: z.nativeEnum(RoomStatus),
  condition: z.nativeEnum(RoomCondition),
  note: z.string(),
});
export default function Page({ params }: { params: { id: string } }) {
  const {
    data: room,
    isLoading: gettingRoom,
    isError: failedGettingRoom,
  } = useGetDetailRoomQuery(params);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);


  const [updateRoom, result] = useUpdateRoomMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error('Sửa phòng họp không thành công');
    } else if (result.isSuccess) {
      toast.success('Sửa phòng họp thành công. Quay về trong vòng 2 giây', {
        duration: 2000,
      });
      setTimeout(() => {
        router.replace('/admin/rooms');
      }, 2000);
    }
  }, [result]);

  useEffect(() => {
    if (failedGettingRoom) {
      toast.error('Không thể tải dữ liệu');
      setTimeout(() => {
        router.replace('/admin/rooms');
      }, 2000);
    }
  }, [failedGettingRoom]);

  useEffect(() => {
    form.setValue('name', room?.tenPhongHop || '');
    form.setValue('condition', room?.tinhTrang || RoomCondition.NORMAL);
    form.setValue('status', room?.trangThai || RoomStatus.AVAILABLE);
    form.setValue('note', room?.ghiChu || '');
  }, [room?.id]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    updateRoom({
      id: Number(params.id),
      tenPhongHop: values.name,
      tinhTrang: RoomStatusRequest[values.status],
      trangThai: RoomConditionRequest[values.condition],
      ghiChu: values.note,
    });
  };

  if (gettingRoom) {
    return <LoadingSpinner className="self-center" />;
  }

  return <>
    <h2 className="text-3xl font-bold mb-4">Sửa phòng họp</h2>
    <Form  {...form}>
      <form id={'hook-form'} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Tên phòng họp</FormLabel>
              <FormControl>
                <Input placeholder={'Ten phong ban'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="name" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Trạng thái</FormLabel>
              <FormControl>
                <Select onValueChange={value => {
                  field.onChange(value);
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[RoomStatus.AVAILABLE, RoomStatus.UNAVAILABLE].map(e => (
                      <SelectItem
                        key={e}
                        value={e.toString()}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="status" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Tình trạng</FormLabel>
              <FormControl>
                <Select onValueChange={value => {
                  field.onChange(value);
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[RoomCondition.NORMAL, RoomCondition.MAINTAINING].map(e => (
                      <SelectItem
                        key={e}
                        value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="condition" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Input placeholder="Ghi chu"  {...field} />
              </FormControl>
              <FormMessage />

            </FormItem>
          )
        } name="note" />

        <Dialog open={showDialog} onOpenChange={setShowDialog} modal={true}>
          <DialogTrigger asChild>
            <Button type={'button'} disabled={result.isLoading} onClick={() => setShowDialog(true)}
                    className=" text-white w-full mb-4 mt-4">Sửa</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bạn có muốn sửa?</DialogTitle>
              <DialogDescription>

              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant={'outline'} type={'submit'} form={'hook-form'} onClick={() => {
                setShowDialog(false);
              }}>Ok
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>


      </form>
    </Form>
  </>;
}

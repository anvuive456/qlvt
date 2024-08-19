'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
import { PropertyCondition, PropertyEnumRequest, PropertyStatus, PropertyType } from '@/model/payload/property-payload';
import { useGetDetailPropertyQuery, useUpdatePropertyMutation } from '@/hooks/api/property';


const FormSchema = z.object({
  code: z.string(),
  status: z.nativeEnum(PropertyStatus),
  condition: z.nativeEnum(PropertyCondition),
  type:z.nativeEnum(PropertyType),
  note: z.string(),
});
export default function Page({ params }: { params: { id: string } }) {
  const {
    data: room,
    isLoading: gettingData,
    isError: failedGettingRoom,
  } = useGetDetailPropertyQuery(params);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);


  const [updateProperty, result] = useUpdatePropertyMutation();

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
    form.setValue('code', room?.maTaiSan || '');
    form.setValue('condition', room?.tinhTrang || PropertyCondition.NORMAL);
    form.setValue('status', room?.trangThai || PropertyStatus.AVAILABLE);
    form.setValue('type', room?.loaiTaiSan || PropertyType.DEFAULT);
    form.setValue('note', room?.ghiChu || '');
  }, [room?.id]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    updateProperty({
      id: Number(params.id),
      maTaiSan: values.code,
      loaiTaiSan: PropertyEnumRequest[values.type],
      tinhTrang: PropertyEnumRequest[values.status],
      trangThai: PropertyEnumRequest[values.condition],
      ghiChu: values.note,
    });
  };

  if (gettingData) {
    return <LoadingSpinner className="self-center" />;
  }

  return <>
    <h2 className="text-3xl font-bold mb-4">Sửa tài sản</h2>
    <Form  {...form}>
      <form id={'hook-form'} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Mã tài sản</FormLabel>
              <FormControl>
                <Input className='uppercase' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="code" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Loại tài sản</FormLabel>
              <FormControl>
                <Select onValueChange={value => {
                  field.onChange(value);
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[PropertyType.DEFAULT, PropertyType.TOOL].map(e => (
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
        } name="type" />
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
                    {[PropertyStatus.AVAILABLE, RoomStatus.UNAVAILABLE].map(e => (
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
                      <SelectValue placeholder="Chọn tình trạng" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[PropertyCondition.NORMAL, PropertyCondition.BROKEN].map(e => (
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

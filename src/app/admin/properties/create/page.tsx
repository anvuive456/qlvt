'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateDepartmentMutation } from '@/hooks/api/department';
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
import { useCreateRoomMutation } from '@/hooks/api/room';
import { RoomCondition, RoomConditionRequest, RoomStatus, RoomStatusRequest } from '@/model/payload/room-payload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gender, getGenderName } from '@/model/gender';
import { PropertyCondition, PropertyEnumRequest, PropertyStatus, PropertyType } from '@/model/payload/property-payload';
import { useCreatePropertyMutation } from '@/hooks/api/property';


const FormSchema = z.object({
  code: z.string().refine(e=> !e.includes(' '),'Không được có khoảng trắng'),
  status: z.nativeEnum(PropertyStatus),
  condition: z.nativeEnum(PropertyCondition),
  type:z.nativeEnum(PropertyType),
  note: z.string(),
});
export default function Page() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [createProperty, result] = useCreatePropertyMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error('Tạo phòng họp không thành công');
    } else if (result.isSuccess) {
      toast.success('Tạo phòng họp thành công. Quay về trong vòng 2 giây', {
        duration: 2000,
      });
      setTimeout(() => {
        router.replace('/admin/rooms');
      }, 2000);
    }
  }, [result]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    createProperty({
      maTaiSan: values.code,
      loaiTaiSan: PropertyEnumRequest[values.type],
      tinhTrang: PropertyEnumRequest[values.status],
      trangThai: PropertyEnumRequest[values.condition],
      ghiChu: values.note,
    });
  };

  return <>
    <h2 className="text-3xl font-bold mb-4">Tạo tài sản</h2>
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
                    className=" text-white w-full mb-4 mt-4">Tạo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bạn có muốn tạo?</DialogTitle>
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

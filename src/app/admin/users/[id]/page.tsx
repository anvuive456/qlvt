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
import { useGetDetailUserQuery, useUpdateUserMutation } from '@/hooks/api/user';
import { Gender } from '@/model/gender';


const FormSchema = z.object({
  email: z.string(),
  ngaySinh: z.string(),
  soDienThoai: z.string(),
  coQuan: z.string(),
  tenDayDu: z.string(),
  gioiTinh: z.nativeEnum(Gender),
  image: z.string(),
  ghiChu: z.string(),
});
export default function Page({ params }: { params: { id: string } }) {
  const { data: user } = useGetDetailUserQuery(params);
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      email: user?.email,
      tenDayDu: user?.tenDayDu,
      ghiChu: user?.ghiChu,
      coQuan: user?.coQuan,
      gioiTinh: user?.gioiTinh ?
        ['MALE', 'NAME'].includes(user?.gioiTinh) ? Gender.MALE : Gender.FEMALE : undefined,
      image: user?.image,
      ngaySinh: user?.ngaySinh,
      soDienThoai: user?.soDienThoai,
    },
    resolver: zodResolver(FormSchema),
  });
  const [updateUser, result] = useUpdateUserMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error('Sửa người dùng không thành công');
    } else if (result.isSuccess) {
      toast.success('Sửa người dùng thành công. Quay về trong vòng 2 giây', {
        duration: 2000,
      });
      setTimeout(() => {
        router.replace('/admin/users');
      }, 2000);
    }
  }, [result]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // updateUser({
    //   id: Number(params.id),
    //   ...values,
    //   username: '',
    //   phongBan: '',
    //   roles: [],
    // });
  };

  return <>
    <h2 className="text-3xl font-bold mb-4">Sửa phòng ban</h2>
    <Form  {...form}>
      <form id={'hook-form'} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Tên phòng ban</FormLabel>
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
              <FormLabel>Tên viết tắt</FormLabel>
              <FormControl>
                <Input placeholder={'Tenviettat'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="slug" />
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

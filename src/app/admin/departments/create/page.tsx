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


const FormSchema = z.object({
  name: z.string(),
  slug: z.string(),
  note: z.string(),
});
export default function Page() {
  const router = useRouter()
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [createDepartment, result] = useCreateDepartmentMutation();

  useEffect(() => {
    if(result.isError) {
      toast.error("Tạo phòng ban không thành công");
    } else if(result.isSuccess) {
      toast.success('Tạo phòng ban thành công. Quay về trong vòng 2 giây',{
        duration: 2000,
      });
      setTimeout(()=>{
        router.replace('/admin/departments');
      },2000)
    }
  }, [result]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    createDepartment({
      tenPhongBan: values.name,
      tenVietTat: values.slug,
      ghiChu: values.note,
    });
  };

  return <>
    <h2 className="text-3xl font-bold mb-4">Tạo phòng ban</h2>
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

        <Dialog open={showDialog} onOpenChange={setShowDialog} modal={true} >
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
                setShowDialog(false)
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

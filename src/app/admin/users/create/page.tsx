'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { zPhoneNumber } from '@/lib/general';
import { Gender, getGenderName } from '@/model/gender';
import { useCreateUserMutation } from '@/hooks/api/user';
import { DateFormatTypes, formatDate } from '@/lib/date-utls';
import { useGetAllDepartmentsQuery } from '@/hooks/api/department';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageData } from '@/lib/get-image-data';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/file-constants';


const FormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  ngaySinh: z.date(),
  soDienThoai: zPhoneNumber,
  coQuan: z.string(),
  tenDayDu: z.string(),
  gioiTinh: z.nativeEnum(Gender),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Phải có ảnh.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ảnh vượt quá 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Chỉ chấp nhận đụng dạng: .jpg, .jpeg, .png và .webp."
    ),
  ghiChu: z.string(),
  idPhongBan: z.number(),
});
export default function Page() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [preview, setPreview] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [createUser, result] = useCreateUserMutation();
  const { data: allDepartments } = useGetAllDepartmentsQuery();

  useEffect(() => {
    console.log(form.formState.errors);
    console.log(form.getValues('image'));
  }, [form.formState.errors]);

  useEffect(() => {
    if (result.isError) {
      toast.error('Tạo quản lý không thành công');
    } else if (result.isSuccess) {
      toast.success('Tạo quản lý thành công. Quay về trong vòng 2 giây', {
        duration: 2000,
      });
      setTimeout(() => {
        router.replace('/admin/users');
      }, 2000);
    }
  }, [result]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    let form = new FormData();
    form.append('username', values.username);
    form.append('email',values.email);
    form.append('ngaySinh',formatDate(values.ngaySinh, DateFormatTypes.DD_MM_YYYY));
    form.append('tenDayDu',values.tenDayDu);
    form.append('gioiTinh',values.gioiTinh.toString());
    form.append('ghiChu',values.ghiChu);
    form.append('idPhongBan',values.idPhongBan.toString());
    form.append('coQuan',values.coQuan);
    form.append('image',values.image[0]);
    form.append('soDienThoai',values.soDienThoai);
    console.log(values.image[0]);

    createUser(form);
  };

  return <>
    <h2 className="text-3xl font-bold mb-4">Thêm quản lý</h2>
    <Form  {...form}>
      <form id={'hook-form'} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <FormField render={
          ({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Ảnh đại diện</FormLabel>
              <FormControl>
                <>
                  <Avatar
                    className='w-32 h-32'
                  >
                    <AvatarImage
                      src={preview} />
                    <AvatarFallback
                    >
                      VN
                    </AvatarFallback>
                  </Avatar>
                  <Input placeholder={'Chọn hình đại diện'}
                         type="file"
                         {...rest}
                         onChange={(event) => {
                           const { files, displayUrl } = getImageData(event);
                           setPreview(displayUrl);
                           onChange(files);
                         }}
                  />
                </>
              </FormControl>
              <FormMessage />

            </FormItem>
          )
        } name="image" />

        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="username" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="tenDayDu" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="email" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder={'Số điện thoại của bạn'} {...field} type={'tel'} />
              </FormControl>
              <FormMessage />

            </FormItem>
          )
        } name="soDienThoai" />
        <FormField
          control={form.control}
          name="ngaySinh"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày sinh</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        formatDate(field.value, DateFormatTypes.DD_MM_YYYY)
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <Select onValueChange={value => {
                  field.onChange(Number(value));
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[Gender.MALE, Gender.FEMALE].map(e => (
                      <SelectItem
                        key={e}
                        value={e.toString()}>
                        {getGenderName(e)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          name="gioiTinh" />

        <FormField
          render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Phòng ban</FormLabel>
                <Select onValueChange={value => {
                  field.onChange(Number(value));
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allDepartments && allDepartments.map(e => (
                      <SelectItem
                        key={e.id}
                        value={e.id.toString()}>
                        {e.tenPhongBan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          name="idPhongBan" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Tên cơ quan</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="coQuan" />
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
        } name="ghiChu" />


        <Dialog open={showDialog} onOpenChange={setShowDialog} modal={true}>
          <DialogTrigger asChild>
            <Button type={'button'} disabled={result.isLoading}
                    className=" text-white w-full mb-4 mt-4">Thêm</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bạn có muốn thêm?</DialogTitle>
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

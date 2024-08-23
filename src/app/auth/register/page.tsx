'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { zPhoneNumber } from '@/lib/general';
import { toast } from 'sonner';
import { useSignUpMutation } from '@/hooks/api/auth';
import { DateFormatTypes, formatDate } from '@/lib/date-utls';
import { Gender, getGenderName } from '@/model/gender';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignUpSchema = z.object({
  username: z.string(),
  phone: zPhoneNumber,
  email: z.string().email(),
  password: z.string(),
  dob: z.date(),
  fullName: z.string(),
  org: z.string(),
  gender: z.nativeEnum(Gender),
});
export default function SignUpPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof SignUpSchema>>({
      resolver: zodResolver(SignUpSchema),
    },
  );

  const [signUp, result] = useSignUpMutation();

  useEffect(() => {
    if (result.error) {
      toast.error('Đăng ký không thành công', {
        position: 'top-right',
      });
    } else if(result.isSuccess) {
      toast('Đăng ký thành công', {
        position: 'top-right',
      });
      router.push('/auth/login');
    }
  }, [result,router]);

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    signUp({
      username: values.username,
      password: values.password,
      email: values.email,
      phone: values.phone,
      dob: formatDate(values.dob, DateFormatTypes.DD_MM_YYYY),
      fullName: values.fullName,
      role: 'user',
      org: values.org,
      gender: values.gender,
    });

    console.log(values);
  };

  return <>
    <h2 className="text-3xl font-bold mb-4">Đăng ký</h2>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder={'Tên của bạn'} {...field} type={'text'} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="fullName" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input placeholder={'Tên đăng nhập'} {...field} type={'text'} />
              </FormControl>
              <FormDescription>
                * Dùng để đăng nhập
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        } name="username" />
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
        } name="phone" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={'admin@email.com'} {...field} type={'email'} />
              </FormControl>
              <FormMessage />

            </FormItem>
          )
        } name="email" />
        <FormField render={
          ({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="password" type={'password'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        } name="password" />
        <FormField render={
          ({ field }) => (<FormItem>
            <FormLabel>Phòng ban</FormLabel>
            <FormControl>
              <Input placeholder={'Siêu phẩm phòng ban'} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>)
        } name="department" />
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
          name="gender" />
        <FormField
          control={form.control}
          name="dob"
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
        <Button type="submit" className=" text-white w-full mb-4 mt-4">Đăng ký</Button>
        <div className="w-full flex flex-row items-center">
          <Link className="text-center w-full" href="/auth/login">Đăng nhập</Link>
        </div>
      </form>
    </Form>
  </>;
}

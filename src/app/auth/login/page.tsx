'use client';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMeQuery, useSignInMutation } from '@/hooks/api/auth';
import { useEffect } from 'react';

const LoginSchema = z.object({
  username: z.string({
    message: 'Tên đăng nhập không được trống',
  }),
  password: z.string({
    message: 'Mật khẩu không được trống',
  }),
});

export default function LoginPage() {
  const [signIn, result] = useSignInMutation();
  const me = useMeQuery();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (!me.isError && me.data) {
      const user = me.data;
      if (user.roles.includes('ROLE_USER')) {
        router.push('/home');
      } else if (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_SUPER')) {
        router.push('/admin');
      } else {
        toast.error(`Unimplemented role: ${user.roles}`);
      }
    }
  }, [me]);
  useEffect(() => {
    if (result.error) {
      toast.error('Đăng nhập không thành công', {
        id: 0,
      });
    } else if (result.data) {
      const hehe = result.data;
      if (hehe?.accessToken) {
        localStorage.setItem('access_token', hehe.accessToken);
      }
      toast('Đăng nhập thành công', {
        id: 1,
      });
    }
  }, [result]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // toast('Đăng nhập thành công');
    signIn(values);

    // if(values.username == 'admin@email.com') {
    //   router.push('/admin');
    // } else {
    //   router.push('/home');
    // }

  };
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Đăng nhập</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <FormField render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input placeholder={'admin'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          } name="username" />
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
          <Button disabled={result.isLoading} type="submit" className=" text-white w-full mb-4 mt-4">Đăng nhập</Button>
          <div className="w-full flex flex-row items-center">
            <Link className="text-center w-full" href="/auth/register">Đăng ký</Link>
          </div>
        </form>
      </Form>
    </>
  );
}



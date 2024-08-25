'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMeQuery } from '@/hooks/api/auth';
import { useEffect } from 'react';

export default function UserHeader() {
  const router = useRouter();
  const { data: me, error,isError,refetch } = useMeQuery();
  useEffect(() => {
    if(isError) {
      router.push('/auth/login');
    }
  }, [isError,router]);
  return <>
    <div className="w-screen flex flex-row items-center justify-end">
      <h1>
        Xin chào,
        <span className="font-bold hover:underline">
        {me?.fullName}
        </span>
      </h1>
      <Button className="m-10" onClick={() => {
        localStorage.removeItem('access_token');
        setTimeout(()=>{
          router.push('/auth/login');
        },500)
      }}>Đăng xuất</Button>
    </div>
  </>;
}

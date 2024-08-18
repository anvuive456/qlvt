'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMeQuery } from '@/hooks/api/auth';

export default function UserHeader() {
  const router = useRouter();
  const { data: me, error } = useMeQuery();
  return <>
    <div className="w-screen flex flex-row items-center justify-end">
      <h1>
        Xin chào,
        <span className="font-bold">
        {me?.fullName}
        </span>
      </h1>
      <Button className="m-10" onClick={() => {
        localStorage.removeItem('access_token');
        router.push('/auth/login');
      }}>Đăng xuất</Button>
    </div>
  </>;
}

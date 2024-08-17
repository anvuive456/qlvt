'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function UserHeader() {
  const router = useRouter();
  return <>
    <div className="w-screen flex flex-row items-end justify-end">
      <Button className='m-10' onClick={() => router.push('/auth/login')}>Đăng xuất</Button>
    </div>
  </>;
}

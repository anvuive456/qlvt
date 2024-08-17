'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const routes = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/admin/users',
    label: 'Người dùng',
  },
  {
    path: '/admin/devices',
    label: 'Thiết bị',
  },
  {
    path: '/admin/departments',
    label: 'Phòng ban',
  },
  {
    path: '/admin/rooms',
    label: 'Phòng họp',
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  return <>
    <div className="relative w-1/5  border-r h-full">
      <div className="flex flex-col ">
        {routes.map(e => (<div key={e.path} className="px-4 py-2 hover:bg-secondary w-full mx-2  rounded my-1">
          <Link href={e.path}>{e.label}</Link>
        </div>))}
      </div>
      <div className="absolute bottom-2 w-full px-2">
        <Button className='w-full ' onClick={()=>{
          router.push('/auth/login')
        }}>Đăng xuất</Button>
      </div>
    </div>

  </>;
}

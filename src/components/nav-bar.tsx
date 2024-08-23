'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useMeQuery } from '@/hooks/api/auth';
import { useEffect } from 'react';

const routes = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    roles: ['ROLE_ADMIN', 'ROLE_SUPER'],
  },
  {
    path: '/admin/users',
    label: 'Người dùng',
    roles: ['ROLE_SUPER'],
  },
  {
    path: '/admin/properties',
    label: 'Tài sản',
    roles: ['ROLE_ADMIN', 'ROLE_SUPER'],
  },
  {
    path: '/admin/departments',
    label: 'Phòng ban',
    roles: ['ROLE_ADMIN', 'ROLE_SUPER'],
  },
  {
    path: '/admin/rooms',
    label: 'Phòng họp',
    roles: ['ROLE_ADMIN', 'ROLE_SUPER'],
  },
  {
    path: '/admin/tickets',
    label: 'Phiếu mượn/trả',
    roles: ['ROLE_ADMIN', 'ROLE_SUPER'],
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: me, isError,refetch } = useMeQuery();
  const myRoles = me?.roles || [];
  return <>
    <div className="relative w-1/5  border-r h-full">
      <div className="flex flex-col ">
        {routes.filter(e => {
          return myRoles.every(role =>{
            return e.roles.includes(role)
          });
        }).map(e => {
          return (<div key={e.path} className="px-4 py-2 hover:bg-secondary w-full mx-2  rounded my-1">
            <Link href={e.path}>{e.label}</Link>
          </div>);
        })}
      </div>
      <div className="absolute bottom-2 w-full px-2">
        <Button className="w-full " onClick={() => {
          localStorage.removeItem('access_token');
          router.replace('/auth/login');
        }}>Đăng xuất</Button>
      </div>
    </div>

  </>;
}

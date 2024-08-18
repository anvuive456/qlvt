import { ColumnDef } from '@tanstack/table-core';
import { User } from '@/model/user';
import { MeResponse } from '@/model/payload/auth-payload';

export const columns: ColumnDef<MeResponse>[] = [
  {
    accessorKey: 'id',
  }, {
    accessorKey: 'tenDayDu',
    header: 'Tên',
  }, {
    accessorKey: 'email',
    header: 'Email',
  }, {
    accessorKey: 'roles',
    header: 'Vai trò',
    cell: ({ row }) => {
      let r = '';
      const roles = row.getValue('roles') as string[];
      if(roles.includes('ROLE_USER')) {
        r = 'Người dùng';
      } else {
        r = 'Admin';
      }
      return <h1>{r}</h1>;
    },
  }, {
    accessorKey: 'phongBan',
    header: 'Phòng ban',
  },
];

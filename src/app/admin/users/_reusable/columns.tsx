import { ColumnDef } from '@tanstack/table-core';

export type User = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: 'admin' | 'user';
}

export const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'admin', department: 'Phòng ban IT' },
  { id: 2, name: 'Bob Brown', email: 'bob.brown@example.com', role: 'user', department: 'Phòng ban Kế toán' },
  {
    id: 3,
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    role: 'admin',
    department: 'Phòng ban Kinh doanh',
  },
  { id: 4, name: 'Diana Evans', email: 'diana.evans@example.com', role: 'user', department: 'Phòng ban IT' },
  { id: 5, name: 'Emily Wilson', email: 'emily.wilson@example.com', role: 'user', department: 'Phòng ban Kế toán' },
  { id: 6, name: 'Frank Lee', email: 'frank.lee@example.com', role: 'admin', department: 'Phòng ban Kinh doanh' },
  { id: 7, name: 'Grace Adams', email: 'grace.adams@example.com', role: 'user', department: 'Phòng ban IT' },
  {
    id: 8,
    name: 'Hannah Martinez',
    email: 'hannah.martinez@example.com',
    role: 'admin',
    department: 'Phòng ban Kế toán',
  },
  {
    id: 9,
    name: 'Isaac Thompson',
    email: 'isaac.thompson@example.com',
    role: 'user',
    department: 'Phòng ban Kinh doanh',
  },
  { id: 10, name: 'Jack Moore', email: 'jack.moore@example.com', role: 'admin', department: 'Phòng ban IT' },
  // { id: 11, name: 'Kathy Clark', email: 'kathy.clark@example.com', role: 'user', department: 'Phòng ban Kế toán' },
  // { id: 12, name: 'Leo King', email: 'leo.king@example.com', role: 'user', department: 'Phòng ban Kinh doanh' },
  // { id: 13, name: 'Mia Allen', email: 'mia.allen@example.com', role: 'admin', department: 'Phòng ban IT' },
  // { id: 14, name: 'Nathan Scott', email: 'nathan.scott@example.com', role: 'user', department: 'Phòng ban Kế toán' },
  // {
  //   id: 15,
  //   name: 'Olivia Wright',
  //   email: 'olivia.wright@example.com',
  //   role: 'admin',
  //   department: 'Phòng ban Kinh doanh',
  // },
  // { id: 16, name: 'Paul Walker', email: 'paul.walker@example.com', role: 'user', department: 'Phòng ban IT' },
  // { id: 17, name: 'Quinn Hall', email: 'quinn.hall@example.com', role: 'user', department: 'Phòng ban Kế toán' },
  // {
  //   id: 18,
  //   name: 'Rachel Adams',
  //   email: 'rachel.adams@example.com',
  //   role: 'admin',
  //   department: 'Phòng ban Kinh doanh',
  // },
  // { id: 19, name: 'Steve Brown', email: 'steve.brown@example.com', role: 'user', department: 'Phòng ban IT' },
  // { id: 20, name: 'Tina Carter', email: 'tina.carter@example.com', role: 'user', department: 'Phòng ban Kế toán' },

];


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',

  }, {
    accessorKey: 'name',
    header: 'Tên',
  }, {
    accessorKey: 'email',
    header: 'Email',
  }, {
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ row }) => {
      let r = '';
      switch (row.getValue('role')) {
        case 'admin':
          r = 'Admin';
          break;
        case 'user':
          r = 'Người dùng';
          break;
      }
      return <h1>{r}</h1>;
    },
  }, {
    accessorKey: 'department',
    header: 'Phòng ban',
  },
];

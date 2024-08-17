import { ColumnDef } from '@tanstack/table-core';

export type Department = {
  id: number;
  name: string;
  total: number;
}

export const mockDepartments: Department[] = [
  {
    id: 1,
    name: 'Phòng IT',
    total: 100,
  },{
    id: 2,
    name: 'Phòng kế toán',
    total: 50,
  },{
    id: 2,
    name: 'Phòng kinh doanh',
    total: 200,
  },
];

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: 'id',
  }, {
    accessorKey: 'name',
    header: 'Tên phòng ban',
  }, {
    accessorKey: 'total',
    header: 'Số lượng nhân viên',
  },
];


import { ColumnDef } from '@tanstack/table-core';
import { DepartmentResponse } from '@/model/payload/department-payload';



export const columns: ColumnDef<DepartmentResponse>[] = [
  {
    accessorKey: 'id',
  },
  {
    accessorKey: 'tenPhongBan',
    header: 'Tên phòng ban',
  },
  {
    accessorKey: 'tenVietTat',
    header: 'Tên viết tắt',
  },
  {
    accessorKey:'ghiChu',
    header:'Ghi chú'
  }
];


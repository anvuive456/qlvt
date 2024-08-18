import { ColumnDef } from '@tanstack/table-core';
import { DepartmentResponse } from '@/model/payload/department-payload';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export const columns = ({
                          onDetail,
                          onDelete,
                        }: {
  onDetail: (id: number) => void,
  onDelete: (id: number) => void,
}): ColumnDef<DepartmentResponse>[] => [
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
    accessorKey: 'ghiChu',
    header: 'Ghi chú',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const department = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={event => onDetail(department.id)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={event => onDelete(department.id)}>
              Xoá
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


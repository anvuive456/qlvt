import { ColumnDef } from '@tanstack/table-core';
import { PropertyResponse } from '@/model/payload/property-payload';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
}): ColumnDef<PropertyResponse>[] => [
  {
    accessorKey: 'id',
  },
  {
    accessorKey:'maTaiSan',
    header:'Mã tài sản'
  },
  {
    accessorKey: 'loaiTaiSan',
    header: 'Loại tài sản',

  },
  {
    accessorKey: 'trangThai',
    header: 'Trạng thái',

  },
  {
    accessorKey: 'tinhTrang',
    header: 'Tình trạng',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const room = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={event => onDetail(room.id)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={event => onDelete(room.id)}>
              Xoá
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

];

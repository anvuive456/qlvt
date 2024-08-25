import { ColumnDef } from '@tanstack/table-core';
import { RoomCondition, RoomResponse, RoomStatus } from '@/model/payload/room-payload';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


export const columns = ({
                          onDetail,
                          onDelete,
                        }: {
  onDetail: (id: number) => void,
  onDelete: (id: number) => void,
}): ColumnDef<RoomResponse>[] => [
  {
    accessorKey: 'id',

  },
  {
    accessorKey: 'tenPhongHop',
    header: 'Tên',
  },
  {
    accessorKey: 'trangThai',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const origin = row.original;
      let r = '';
      if (origin.trangThai == RoomStatus.AVAILABLE) {
        r = 'Đang trống';
      } else {
        r = 'Đang được mượn';
      }
      return <Badge variant={origin.trangThai == RoomStatus.AVAILABLE ? 'default' : 'outline'}>{r}</Badge>;
    },
  },
  {
    accessorKey: 'tinhTrang',
    header: 'Tình trạng',
    cell: ({ row }) => {
      const origin = row.original;
      let r = '';
      if (origin.tinhTrang == RoomCondition.MAINTAINING) {
        r = 'Đang bảo trì';
      } else {
        r = 'Hoạt động tốt';
      }
      return <Badge variant={origin.tinhTrang == RoomCondition.MAINTAINING ? 'outline' : 'default'}>{r}</Badge>;
    },
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

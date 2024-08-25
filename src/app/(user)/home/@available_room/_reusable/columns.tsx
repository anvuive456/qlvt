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
import { RoomCondition, RoomResponse, RoomStatus } from '@/model/payload/room-payload';
import { Badge } from '@/components/ui/badge';


export const userRoomsColumn = ({
                                       onAction,
                                     }: {
  onAction: (room: RoomResponse) => void,
}): ColumnDef<RoomResponse>[] => {
  return [
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
      size:1,
      cell: ({ row }) => {
        const original = row.original;
        return (
          <Button size='sm' onClick={event => onAction(original)}>Mượn</Button>
        );
      },
    },

  ];
};

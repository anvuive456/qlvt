import { ColumnDef } from '@tanstack/table-core';
import { SlipResponse, SlipStatus } from '@/model/payload/slip-payload';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DateFormatTypes, formatDate } from '@/lib/date-utls';


export const columns = ({ onAccept, onDeny }: {
  onAccept: (slip: SlipResponse) => void,
  onDeny: (slip: SlipResponse) => void,
}): ColumnDef<SlipResponse>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      id: 'name',
      header: 'Tên',
      cell: ({ row }) => {
        const origin = row.original;
        const name = origin.phongHop?.tenPhongHop || origin.taiSan.maTaiSan;
        return <h1>{name}</h1>;
      },
    },
    {
      accessorKey: 'lyDo',
      header: 'Lý do',
    },
    {
      accessorKey: 'ngayMuon',
      header: 'Ngày mượn',
      cell: ({ row }) => {
        const origin = row.original;

        return <>{formatDate(new Date(origin.ngayMuon), DateFormatTypes.DD_MM_YYYY)}</>;
      },
    },
    {
      accessorKey: 'ngayTra',
      header: 'Hạn trả',
      cell: ({ row }) => {
        const origin = row.original;

        return <>{formatDate(new Date(origin.ngayTra), DateFormatTypes.DD_MM_YYYY)}</>;
      },
    },
    {
      accessorKey: 'nguoiDung',
      header: 'Người mượn',
      cell: ({ row }) => {
        const origin = row.original;

        return <h1>{origin.nguoiDung.tenDayDu}</h1>;
      },
    },
    {
      accessorKey: 'trangThaiDuyet',
      header: 'Trạng thái duyệt',
      cell: ({ row }) => {
        const { trangThaiDuyet } = row.original;
        let r = '';
        if (trangThaiDuyet == 'CHO_DUYET') {
          r = 'Chờ duyệt';
        } else if (trangThaiDuyet == 'DA_DUYET') {
          r = 'Đã duyệt';
        } else {
          r = 'Không duyệt';
        }
        return <Badge>{r}</Badge>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const original = row.original;
        if (original.trangThaiDuyet == SlipStatus.PENDING)
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Mở menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={event => onAccept(original)}>
                  Duyệt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={event => onDeny(original)}>
                  Từ chối
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        else {
          return <></>;
        }
      },
    },

  ];
};

import { ColumnDef } from '@tanstack/table-core';
import { ReturnSlipResponse, ReturnSlipStatus } from '@/model/payload/slip-payload';
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
  onAccept: (slip: ReturnSlipResponse) => void,
  onDeny: (slip: ReturnSlipResponse) => void,
}): ColumnDef<ReturnSlipResponse>[] => {
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
        const name = origin.phieuMuon.phongHop?.tenPhongHop || origin.phieuMuon.taiSan.maTaiSan;
        return <h1>{name}</h1>;
      },
    },
    {
      accessorKey: 'hanTra',
      header: 'Hạn trả',
      cell: ({ row }) => {
        const origin = row.original;

        return <h1>{formatDate(new Date(origin.hanTra), DateFormatTypes.DD_MM_YYYY)}</h1>;
      },
    },
    {
      accessorKey: 'ngayTra',
      header: 'Ngày trả',
      cell: ({ row }) => {
        const origin = row.original;
        if (!origin.ngayTra)
          return <h1>Chưa trả</h1>;
        return <h1>{formatDate(new Date(origin.ngayTra), DateFormatTypes.DD_MM_YYYY)}</h1>;
      },
    },
    {
      accessorKey: 'ngayMuon',
      header: 'Ngày mượn',
      cell: ({ row }) => {
        const origin = row.original;


        return <h1>{formatDate(new Date(origin.phieuMuon.ngayMuon), DateFormatTypes.DD_MM_YYYY)}</h1>;

      },
    },
    {
      accessorKey: 'phieuMuon',
      header: 'ID phiếu mượn',
      cell: ({ row }) => {
        const { phieuMuon } = row.original;
        return <h1>{phieuMuon.id}</h1>;
      },
    },
    {
      accessorKey: 'nguoiDung',
      header: 'Người mượn',
      cell: ({ row }) => {
        const origin = row.original;

        return <h1>{origin.phieuMuon.nguoiDung.tenDayDu}</h1>;
      },
    },
    {
      accessorKey: 'trangThaiDuyet',
      header: 'Trạng thái duyệt',
      cell: ({ row }) => {
        const { trangThaiTra } = row.original;
        let r = '';
        if (trangThaiTra == 'DA_TRA') {
          r = 'Đã trả';
        } else if (trangThaiTra == 'CHUA_TRA') {
          r = 'Chưa trả';
        } else {
          r = 'Quá hạn';
        }
        return <Badge>{r}</Badge>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const original = row.original;
        if (original.trangThaiTra == ReturnSlipStatus.UNDONE)
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
                  Đã trả
                </DropdownMenuItem>
                <DropdownMenuItem onClick={event => onDeny(original)}>
                  Quá hạn
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

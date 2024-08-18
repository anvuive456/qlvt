import { ColumnDef } from '@tanstack/table-core';
import { User } from '@/model/user';
import { MeResponse } from '@/model/payload/auth-payload';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DepartmentResponse } from '@/model/payload/department-payload';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const columns = ({
                          onDetail,
                          onDelete,
                        }: {
  onDetail: (id: number) => void,
  onDelete: (id: number) => void,
}): ColumnDef<MeResponse>[] => [
  {
    accessorKey: 'id',
  },
  // {
  //   accessorKey: 'image',
  //   enableResizing:false,
  //   enableSorting: false,
  //   enableColumnFilter: false,
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const origin = row.original;
  //     return ;
  //   },
  // },
  {
    accessorKey: 'tenDayDu',
    header: 'Người dùng',
    cell: ({row}) => {
      const origin = row.original;
      return <div className='flex flex-row gap-3 items-center'>
        <Avatar>
          <AvatarImage src={origin.image} alt="@shadcn" />
          <AvatarFallback>{origin.tenDayDu.substring(0,2)}</AvatarFallback>
        </Avatar>
        <h1>{origin.tenDayDu}</h1>
      </div>
    }
  }, {
    accessorKey: 'email',
    header: 'Email',
  }, {
    accessorKey: 'roles',
    header: 'Vai trò',
    cell: ({ row }) => {
      let r = '';
      const roles = row.getValue('roles') as string[];
      if (roles.includes('ROLE_USER')) {
        r = 'Người dùng';
      } else {
        r = 'Admin';
      }
      return <h1>{r}</h1>;
    },
  },
  {
    accessorKey: 'phongBan',
    header: 'Phòng ban',
    cell: ({ row }) => {
      const department = row.getValue('phongBan') as DepartmentResponse;

      return <h1>{department?.tenPhongBan || ''}</h1>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={event => onDetail(user.id)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={event => onDelete(user.id)}>
              Xoá
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

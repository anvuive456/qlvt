import { ColumnDef } from '@tanstack/table-core';
import { PropertyCondition, PropertyResponse, PropertyStatus, PropertyType } from '@/model/payload/property-payload';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoomCondition } from '@/model/payload/room-payload';


export const userPropertiesColumn = ({
                                       onAction,
                                     }: {
  onAction: (property: PropertyResponse) => void,
}): ColumnDef<PropertyResponse>[] => {
  return [

    {
      accessorKey: 'maTaiSan',
      header: 'Mã tài sản',
    },
    {
      accessorKey: 'loaiTaiSan',
      header: 'Loại tài sản',
      cell: ({ row }) => {
        const {loaiTaiSan} = row.original;
        switch (loaiTaiSan) {
          case PropertyType.DEFAULT:
            return <h1>Tài sản cố định</h1>
          case PropertyType.TOOL:
            return <h1>Công cụ dụng cụ</h1>
        }
      }
    },
    // {
    //   accessorKey: 'trangThai',
    //   header: 'Trạng thái',
    //   cell: ({ row }) => {
    //     const { trangThai } = row.original;
    //
    //     let r = '';
    //     if (trangThai == PropertyStatus.AVAILABLE) {
    //       r = 'Có sẵn';
    //     } else if (trangThai == PropertyStatus.UNAVAILABLE) {
    //       r = 'Đã được mượn'
    //     }
    //     return <Badge >{r}</Badge>
    //   }
    // },
    {
      accessorKey: 'tinhTrang',
      header: 'Tình trạng',
      cell: ({ row }) => {
        const origin = row.original;
        let r = '';
        if (origin.tinhTrang == PropertyCondition.NORMAL) {
          r = 'Hoạt động tốt';
        } else {
          r  = 'Bị hỏng'
        }
        return <Badge >{r}</Badge>
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const original= row.original;

        return (
          <Button size='sm' onClick={event => onAction(original)}>Mượn</Button>
        );
      },
    },

  ];
};

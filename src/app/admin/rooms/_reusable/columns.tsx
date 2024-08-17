import { ColumnDef } from '@tanstack/table-core';

export type Room = {
  id: number;
  name: string;
  status: string;
}

export const mockRooms: Room[] = [
  { id: 1, name: 'Phòng họp A', status: 'đang trống' },
  { id: 2, name: 'Phòng họp B', status: 'đã được đặt' },
  { id: 3, name: 'Phòng làm việc 1', status: 'đang trống' },
  { id: 4, name: 'Phòng làm việc 2', status: 'đã được đặt' },
  { id: 5, name: 'Phòng hội thảo', status: 'đang trống' },
  { id: 6, name: 'Phòng tiếp khách', status: 'đã được đặt' },
  { id: 7, name: 'Phòng quản lý', status: 'đang trống' },
  { id: 8, name: 'Phòng lưu trữ', status: 'đã được đặt' },
  { id: 9, name: 'Phòng đào tạo', status: 'đang trống' },
  { id: 10, name: 'Phòng nghiên cứu', status: 'đã được đặt' },
  { id: 11, name: 'Phòng thư giãn', status: 'đang trống' },
  { id: 12, name: 'Phòng IT', status: 'đã được đặt' },
  { id: 13, name: 'Phòng kế toán', status: 'đang trống' },
  { id: 14, name: 'Phòng nhân sự', status: 'đã được đặt' },
  { id: 15, name: 'Phòng họp nhỏ', status: 'đang trống' },
  { id: 16, name: 'Phòng giám đốc', status: 'đã được đặt' },
  { id: 17, name: 'Phòng thư ký', status: 'đang trống' },
  { id: 18, name: 'Phòng sáng tạo', status: 'đã được đặt' },
  { id: 19, name: 'Phòng truyền thông', status: 'đang trống' },
  { id: 20, name: 'Phòng dự án', status: 'đã được đặt' },
];


export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: 'id',

  }, {
    accessorKey: 'name',
    header: 'Tên',
  }, {
    accessorKey: 'status',
    header: 'Trạng thái',
  },
];

import { ColumnDef } from '@tanstack/table-core';

export type Device = {
  id: number,
  amount: number,
  status: 'borrowing' | 'available',
  name: string,
  borrower: string,
  startDate: Date,
  endDate: Date,
}


export const mockDevices: Device[] = [
  {
    id: 1,
    amount: 10,
    status: 'available',
    name: 'Laptop',
    borrower: '',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-15'),
  },
  {
    id: 2,
    amount: 5,
    status: 'borrowing',
    name: 'Tablet',
    borrower: 'John Doe',
    startDate: new Date('2024-08-05'),
    endDate: new Date('2024-08-20'),
  },
  {
    id: 3,
    amount: 7,
    status: 'available',
    name: 'Smartphone',
    borrower: '',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-10'),
  },
  {
    id: 4,
    amount: 3,
    status: 'borrowing',
    name: 'Projector',
    borrower: 'Jane Smith',
    startDate: new Date('2024-08-03'),
    endDate: new Date('2024-08-18'),
  },
  {
    id: 5,
    amount: 8,
    status: 'available',
    name: 'Printer',
    borrower: '',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-25'),
  },
  {
    id: 6,
    amount: 2,
    status: 'borrowing',
    name: 'Camera',
    borrower: 'Alice Johnson',
    startDate: new Date('2024-08-07'),
    endDate: new Date('2024-08-22'),
  },
  {
    id: 7,
    amount: 6,
    status: 'available',
    name: 'Headphones',
    borrower: '',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-12'),
  },
  {
    id: 8,
    amount: 4,
    status: 'borrowing',
    name: 'Keyboard',
    borrower: 'Bob Brown',
    startDate: new Date('2024-08-08'),
    endDate: new Date('2024-08-23'),
  },
  {
    id: 9,
    amount: 9,
    status: 'available',
    name: 'Mouse',
    borrower: '',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-20'),
  },
  {
    id: 10,
    amount: 1,
    status: 'borrowing',
    name: 'Docking Station',
    borrower: 'Charlie Davis',
    startDate: new Date('2024-08-09'),
    endDate: new Date('2024-08-24'),
  },
  // {
  //   id: 11,
  //   amount: 12,
  //   status: 'available',
  //   name: 'Monitor',
  //   borrower: '',
  //   startDate: new Date('2024-08-01'),
  //   endDate: new Date('2024-08-30'),
  // },
  // {
  //   id: 12,
  //   amount: 3,
  //   status: 'borrowing',
  //   name: 'Scanner',
  //   borrower: 'Emily Wilson',
  //   startDate: new Date('2024-08-10'),
  //   endDate: new Date('2024-08-25'),
  // },
  // {
  //   id: 13,
  //   amount: 5,
  //   status: 'available',
  //   name: 'External Hard Drive',
  //   borrower: '',
  //   startDate: new Date('2024-08-01'),
  //   endDate: new Date('2024-08-15'),
  // },
  // {
  //   id: 14,
  //   amount: 7,
  //   status: 'borrowing',
  //   name: 'Smartwatch',
  //   borrower: 'Frank Lee',
  //   startDate: new Date('2024-08-06'),
  //   endDate: new Date('2024-08-21'),
  // },
  // {
  //   id: 15,
  //   amount: 2,
  //   status: 'available',
  //   name: 'Router',
  //   borrower: '',
  //   startDate: new Date('2024-08-01'),
  //   endDate: new Date('2024-08-12'),
  // },
  // {
  //   id: 16,
  //   amount: 8,
  //   status: 'borrowing',
  //   name: 'VR Headset',
  //   borrower: 'Grace Adams',
  //   startDate: new Date('2024-08-07'),
  //   endDate: new Date('2024-08-22'),
  // },
  // {
  //   id: 17,
  //   amount: 4,
  //   status: 'available',
  //   name: 'Microphone',
  //   borrower: '',
  //   startDate: new Date('2024-08-01'),
  //   endDate: new Date('2024-08-18'),
  // },
  // {
  //   id: 18,
  //   amount: 6,
  //   status: 'borrowing',
  //   name: 'Speakers',
  //   borrower: 'Hannah Martinez',
  //   startDate: new Date('2024-08-04'),
  //   endDate: new Date('2024-08-19'),
  // },
  // {
  //   id: 19,
  //   amount: 3,
  //   status: 'available',
  //   name: 'Webcam',
  //   borrower: '',
  //   startDate: new Date('2024-08-01'),
  //   endDate: new Date('2024-08-10'),
  // },
  // {
  //   id: 20,
  //   amount: 9,
  //   status: 'borrowing',
  //   name: 'Desk Lamp',
  //   borrower: 'Isaac Thompson',
  //   startDate: new Date('2024-08-02'),
  //   endDate: new Date('2024-08-17'),
  // },

];


export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: 'id',

  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
  },
  {
    accessorKey: 'amount',
    header: 'Số lượng',
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày mượn',
    cell: ({ row }) => {
      const data = row.getValue<Date>('startDate');
      return <h1>{data.toLocaleString()}</h1>;
    },
  },
  {
    accessorKey: 'endDate',
    cell: ({ row }) => {
      const data = row.getValue<Date>('endDate');
      return <h1>{data.toLocaleString()}</h1>;
    },
    header: 'Ngày trả',
  },
  {
    accessorKey: 'name',
    header: 'Thiết bị',
  },
  {
    accessorKey: 'borrower',
    header: 'Người mượn',
  },
];

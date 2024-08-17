'use client'
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { columns, mockRooms, Room } from '@/app/admin/rooms/_reusable/columns';

export default function Page() {
  const [data, setData] = useState<Room[]>([]);

  useEffect(() => {
    setData(mockRooms);
  }, []);

  return <>
    <div className='hidden flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Phòng họp</h2>
        </div>
        <div className=" ">
          <DataTable
            onDelete={ids => {
            }}
            getIdFromRow={row => row.id}
            filterCol='name'
            columns={columns} data={data} />

        </div>
      </div>

    </div>

  </>;
}

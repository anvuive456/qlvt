'use client'
import { useEffect, useState } from 'react';
import { columns, mockRooms, Room } from '@/app/admin/rooms/_reusable/columns';
import { DataTable } from '@/components/table/data-table';

export default function Page(){
  const [data,setData] = useState<Room[]>([]);
  useEffect(() => {
    setData(mockRooms.filter(e=> e.status == 'đang trống').slice(0,5))
  }, []);
  return <>
    <div>
      <DataTable
        onDelete={ids => {

        }}
        getIdFromRow={row => row.id}
        filterCol="name"
        columns={columns}
        data={data}
      />

    </div>


  </>;
}

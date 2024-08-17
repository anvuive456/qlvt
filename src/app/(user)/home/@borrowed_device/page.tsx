'use client'
import { useEffect, useState } from 'react';
import { columns, mockRooms, Room } from '@/app/admin/rooms/_reusable/columns';
import { DataTable } from '@/components/table/data-table';
import { Device, mockDevices } from '@/app/admin/devices/_reusable/columns';

export default function Page(){
  const [data,setData] = useState<Device[]>([]);
  useEffect(() => {
    setData(mockDevices.filter(e=> e.status == 'borrowing').slice(0,5))
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

'use client'
import { DataTable } from '@/components/table/data-table';
import { useEffect, useState } from 'react';

import { columns } from '@/app/admin/rooms/_reusable/columns';

export default function Page() {
  const [data,setData] = useState<Room[]>([]);
  useEffect(() => {
    setData(mockRooms.filter(e=> e.status == 'đã được đặt').slice(0,5))
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

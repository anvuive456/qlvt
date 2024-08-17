'use client';

import { columns, Device, mockDevices } from '@/app/admin/devices/_reusable/columns';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/data-table';

export default function Page() {
  const [data, setData] = useState<Device[]>([]);

  useEffect(() => {
    setData(mockDevices);
  }, []);

  return <>
    <div className='hidden flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Các thiết bị</h2>
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

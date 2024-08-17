'use client';
import { DataTable } from '@/components/table/data-table';
import { useEffect, useState } from 'react';
import { columns, mockUsers, User } from '@/app/admin/users/_reusable/columns';

export default function Page() {
  const [data, setDate] = useState<User[]>([]);

  useEffect(() => {
    setDate(mockUsers);
  }, []);

  return <>
    <div className='hidden flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Người dùng</h2>
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

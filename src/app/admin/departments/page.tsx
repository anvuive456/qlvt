'use client';
import { DataTable } from '@/components/table/data-table';
import { useEffect, useState } from 'react';
import { columns, Department, mockDepartments } from '@/app/admin/departments/_reusable/columns';

export default function Page() {
  const [data, setDate] = useState<Department[]>([]);

  useEffect(() => {
    setDate(mockDepartments);
  }, []);

  return <>
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Phòng ban</h2>
        </div>
        <div className=" ">
          <DataTable
            onDelete={ids => {
            }}
            getIdFromRow={row => row.id}
            filterCol="name"
            columns={columns}
            data={data}
          />

        </div>
      </div>

    </div>
  </>;
}

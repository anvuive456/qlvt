'use client'

import { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useSearchReturnSlipsQuery, useUpdateReturnSlipStatusMutation } from '@/hooks/api/return-slip';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/app/(user)/home/@my_slip/_reusable/columns';

export default function Page() {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data } = useSearchReturnSlipsQuery({
    page: paginationState?.pageIndex || 0,
    size: paginationState.pageSize,
    // keyWord: search
  });



  return <>
    <DataTable
      tableOptions={{
        rowCount: data?.totalElements,
        pageCount: data?.totalPages,
        onPaginationChange: setPaginationState,
        state: {
          pagination: paginationState,
        },
      }}
      getIdFromRow={row => row.id}
      onSearch={setSearch}
      columns={columns()} data={data?.content || []} />
  </>;
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagablePayload } from '@/model/payload/pagable-payload';
import { ReturnSlipResponse } from '@/model/payload/slip-payload';


export const returnSlipApi = createApi({
  reducerPath: 'returnSlipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/phieu-tra',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
  }),
  tagTypes: ['RETURN-SLIPS'],
  endpoints: build => {
    return {
      searchReturnSlips: build.query<PagablePayload<ReturnSlipResponse>, {
        page: number;
        size: number;
      }>({
        query: arg => {
          return {
            url: `/search?page=${arg.page}&size=${arg.size}`,
          };
        },
        providesTags: ['RETURN-SLIPS'],
      }),
      updateReturnSlipStatus: build.mutation<void, {
        id: number;
        status: number;
        note: string;
      }>({
        query: ({ id, status, note }) => {
          return {
            url: `/duyet-tra/${id}?trangThaiTra=${status}&ghiChu=${note}`,
            method: 'PUT',
          };
        },
        invalidatesTags: ['RETURN-SLIPS'],
      }),
    };
  },
});

export const {
  useSearchReturnSlipsQuery,
  useUpdateReturnSlipStatusMutation,
} = returnSlipApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SlipRequest, SlipResponse } from '@/model/payload/slip-payload';
import { propertyApi } from '@/hooks/api/property';
import { roomApi } from '@/hooks/api/room';
import { PagablePayload } from '@/model/payload/pagable-payload';
import build from 'next/dist/build';


export const slipApi = createApi({
  reducerPath: 'slipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/phieu-muon',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
  }),
  tagTypes: ['SLIPS'],
  endpoints: build => {
    return {
      searchSlips: build.query<PagablePayload<SlipResponse>, {
        page: number;
        size: number;
        keyWord?:string;
      }>({
        query: arg => {
          return {
            url: `/search?page=${arg.page}&size=${arg.size}&keyWord=${arg.keyWord || ''}`,
          };
        },
        providesTags: ['SLIPS'],
      }),
      updateSlipStatus: build.mutation<void, { id: number; status: number; }>({
        query: ({ id, status }) => {
          return {
            url: `/duyet-phieu/${id}?trangThai=${status}`,
            method: 'PUT',
          };
        },
        onQueryStarted: async (arg, api) => {
          await api.queryFulfilled;
          api.dispatch(propertyApi.util.invalidateTags(['DEVICES']));
          api.dispatch(roomApi.util.invalidateTags(['ROOMS']));
        },
        invalidatesTags: ['SLIPS'],
      }),
      createPropertySlip: build.mutation<void, SlipRequest>({
        query: arg => {
          return {
            url: '/tai-san',
            method: 'POST',
            body: arg,
          };
        },
        onQueryStarted: async (arg, api) => {
          await api.queryFulfilled;
          api.dispatch(propertyApi.util.invalidateTags(['DEVICES']));
        },
      }),
      createRoomSlip: build.mutation<void, SlipRequest>({
        query: arg => {
          return {
            url: '/phong',
            method: 'POST',
            body: arg,
          };
        },
        onQueryStarted: async (arg, api) => {
          await api.queryFulfilled;
          api.dispatch(roomApi.util.invalidateTags(['ROOMS']));
        },
      }),
    };
  },
});

export const {
  useSearchSlipsQuery,
  useCreatePropertySlipMutation,
  useCreateRoomSlipMutation,
  useUpdateSlipStatusMutation,
} = slipApi;

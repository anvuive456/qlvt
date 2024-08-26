import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/dashboard',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
  }),
  endpoints: build => {
    return {
      getRecent: build.query<Array<{
        nguoidung_id: string,
        image?: string,
        ten_day_du: string,
        username: string,
        so_luong: string
      }>, void>({
        query: arg => ({
          url: '/danh-sach-muon-7days',
        }),
        transformResponse: (baseQueryReturnValue: {
          data: Array<{
            nguoidung_id: string,
            image?: string,
            ten_day_du: string,
            username: string,
            so_luong: string
          }>
        }) => {
          return baseQueryReturnValue.data;
        },
      }),
    };
  },
});

export const {
  useGetRecentQuery,
} = dashboardApi;

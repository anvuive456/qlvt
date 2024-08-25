import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagablePayload } from '@/model/payload/pagable-payload';
import { CreateRoomRequest, RoomResponse, UpdateRoomRequest } from '@/model/payload/room-payload';


export const roomApi = createApi({
  reducerPath: 'roomApi',
  tagTypes: ['ROOMS'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/phong-hop',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
  }),
  endpoints: build => {
    return {
      searchRooms: build.query<PagablePayload<RoomResponse>, {
        tenPhongHop?: string;
        page: number;
        size: number;
        status?: string;
      }>({
        query: arg => ({
          url: `/search?tenPhongHop=${arg.tenPhongHop || ''}&page=${arg.page}&size=${arg.size}&trangThai=${arg.status || ''}`,
        }),
        providesTags: ['ROOMS'],
      }),
      getDetailRoom: build.query<RoomResponse, { id: string }>({
        query: arg => {
          return {
            url: `/${arg.id}`,
          };
        },
        transformResponse: (value: {data: RoomResponse}) => {
          return value.data;
        }
      }),
      createRoom: build.mutation<RoomResponse, CreateRoomRequest>({
        query: arg => {
          return {
            url: '',
            method: 'POST',
            body: arg,
          };
        },
        invalidatesTags: ['ROOMS'],
      }),
      updateRoom: build.mutation<RoomResponse, UpdateRoomRequest>({
        query: ({ id, ...arg }) => {
          return {
            url: `/${id}`,
            method: 'PUT',
            body: arg,
          };
        },
        invalidatesTags: ['ROOMS'],
      }),
      deleteRoom: build.mutation<void, { id: number }>({
        query: arg => {
          return {
            url: `/${arg.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['ROOMS'],
      }),
    };
  },
});

export const {
  useSearchRoomsQuery,
  useGetDetailRoomQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = roomApi;

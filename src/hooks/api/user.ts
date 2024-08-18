import { createApi, EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/model/user';
import { PagablePayload } from '@/model/payload/pagable-payload';
import { MeResponse } from '@/model/payload/auth-payload';
import { Gender } from '@/model/gender';
import { CreateUserRequest } from '@/model/payload/user-payload';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/nguoi-dung',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
    // mode: 'no-cors',
  }),
  tagTypes: ['USERS'],
  endpoints(build) {
    return {
      searchUsers: build.query<PagablePayload<MeResponse>, {
        tenDayDu?: string;
        page: number;
        size: number;
      }>({
        query: arg => ({
          method: 'GET',
          url: `/search?page=${arg.page}&size=${arg.size}&tenDayDu=${arg.tenDayDu || ''}`,
        }),
        providesTags: ['USERS'],
        // transformResponse:( {data}:{data: PagablePayload<MeResponse>}) => {
        //   console.log('USERS',data);
        //   if(!data) return {
        //     content: [],
        //     number:0,
        //     totalPages:0,
        //   };
        //   return {
        //     ...data,
        //     content: data.content.map(e=>{
        //       return {
        //         id: e.id,
        //         username: e.username,
        //         email: e.email,
        //         dob: e.ngaySinh,
        //         gender: (e.gioiTinh == 'NAM' || e.gioiTinh == 'MALE') ? Gender.MALE : Gender.FEMALE,
        //         image: e.image,
        //         roles: e.roles.map(role => role.ten),
        //         phone: e.soDienThoai,
        //         fullName: e.tenDayDu,
        //       }
        //     })
        //   }
        // },
      }),
      getDetailUser: build.query<MeResponse, { id: string }>({
        query: arg => ({
          url: `/${arg.id}`,
        }),
      }),
      createUser: build.mutation<void, CreateUserRequest>({
        query: arg => ({
          url: '',
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['USERS'],
      }),
      updateUser: build.mutation<MeResponse, MeResponse>({
        query: arg => ({
          url: `/${arg.id}`,
          method: 'PUT',
          body: arg,
        }),
      }),
      deleteUser: build.mutation<void, { id: number }>({
        query: arg => ({
          url: `/${arg.id}`,
          method: 'POST',
        }),
        invalidatesTags: ['USERS'],
      }),
    };
  },
});

export const {
  useSearchUsersQuery,
  useGetDetailUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} = userApi;

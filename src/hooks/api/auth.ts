import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MeResponse, SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@/model/payload/auth-payload';
import { User } from '@/model/user';
import { Gender } from '@/model/gender';
import build from 'next/dist/build';
import { setAuthState } from '@/hooks/reducer/auth-reducer';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/auth',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  }),
  tagTypes: ['User'],
  endpoints(build) {
    return {
      signUp: build.mutation<SignUpResponse, SignUpRequest>({
        query: (payload) => ({
          url: '/signup',
          method: 'POST',
          body: {
            email: payload.email,
            username: payload.username,
            password: payload.password,
            ngaySinh: payload.dob,
            soDienThoai: payload.phone,
            coQuan: payload.department,
            tenDayDu: payload.fullName,
            gender: payload.gender,
            role: [payload.role],
          },
        }),
      }),
      signIn: build.mutation<SignInResponse, SignInRequest>({
        query: (payload) => ({
          url: '/signin',
          method: 'POST',
          body: payload,
        }),
        invalidatesTags: ['User'],
        onQueryStarted: async (arg, api) => {
          const res = await api.queryFulfilled;
          const token = res.data.accessToken;
          api.dispatch(setAuthState({
            token,
            isAuthenticated: true,
          }));
        },
      }),
      me: build.query<User, {}>({
        query: () => '/me',
        transformResponse: ({ data }: { data: MeResponse }) => {
          return {
            id: data.id,
            username: data.username,
            email: data.email,
            dob: data.ngaySinh,
            gender: (data.gioiTinh == 'NAM' || data.gioiTinh == 'MALE') ? Gender.MALE : Gender.FEMALE,
            image: data.image,
            roles: data.roles.map(role => role.ten),
            phone: data.soDienThoai,
            fullName: data.tenDayDu,
          };
        },
        providesTags: result => {
          return ['User'];
        },
      }),
    };
  },
});

export const { useMeQuery, useSignInMutation, useSignUpMutation } = authApi;

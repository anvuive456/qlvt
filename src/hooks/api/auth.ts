import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@/model/payload/auth-payload';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/auth',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  }),
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
      }),
      me: build.query({
        query: () => '/me',
      }),
    };
  },
});

export const { useMeQuery, useSignInMutation, useSignUpMutation } = authApi;

import { createApi, EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/model/user';

export const userApi = createApi({
  reducerPath:'users',
  baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:8080/api/nguoi-dung',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  }),
  endpoints(build) {
    return {
      searchUsers : build.query<User,{
        
      }>({
        query: arg => ({
          url:'/search',
        })
      })
    }
  }
})

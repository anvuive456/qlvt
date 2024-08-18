import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagablePayload } from '@/model/payload/pagable-payload';
import { DepartmentRequest, DepartmentResponse } from '@/model/payload/department-payload';
import build from 'next/dist/build';


export const departmentApi = createApi({
  reducerPath: 'departments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/phong-ban',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
  }),
  tagTypes: ['DEPARTMENTS'],
  endpoints(build) {
    return {
      getAllDepartments: build.query<DepartmentResponse[], void>({
        query: arg => {
          return {
            url: '',
            method: 'GET',
          };
        },
      }),
      getDetailDepartment: build.query<DepartmentResponse, { id: string }>({
        query: arg => {
          return {
            url: `/${arg.id}`,
          };
        },
        transformResponse: (value: { data: DepartmentResponse }) => {
          return value.data;
        },
      }),
      updateDepartment: build.mutation<DepartmentResponse, DepartmentRequest & { id: number }>({
        query: ({ id, ...arg }) => {
          return {
            url: `/${id}`,
            body: arg,
            method: 'PUT',
          };
        },
        invalidatesTags: ['DEPARTMENTS'],
      }),
      deleteDepartment: build.mutation<void, { id: number }>({
        query: arg => {
          return {
            url: `/${arg.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['DEPARTMENTS'],
      }),
      createDepartment: build.mutation<DepartmentResponse, DepartmentRequest>({
        query: arg => {
          return {
            url: '',
            method: 'POST',
            body: arg,
          };
        },
        invalidatesTags: ['DEPARTMENTS'],
      }),
      searchDepartments: build.query<PagablePayload<DepartmentResponse>, {
        tenPhongBan?: string;
        page: number;
        size: number;
      }>({
        query: arg => ({
          method: 'GET',
          url: `/search?page=${arg.page}&size=${arg.size}&tenPhongBan=${arg.tenPhongBan || ''}`,
        }),
        providesTags: ['DEPARTMENTS'],
      }),
    };
  },
});

export const {
  useSearchDepartmentsQuery,
  useGetDetailDepartmentQuery,
  useGetAllDepartmentsQuery,
  useDeleteDepartmentMutation,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;

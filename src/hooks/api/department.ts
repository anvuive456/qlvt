import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagablePayload } from '@/model/payload/pagable-payload';
import { DepartmentRequest, DepartmentResponse } from '@/model/payload/department-payload';


export const departmentApi = createApi({
  reducerPath: 'departments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/phong-ban',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
  }),
  tagTypes: ['DEPARTMENTS'],
  endpoints(build) {
    return {
      getAllDepartments: build.query<DepartmentResponse[], {}>({
        query: arg => {
          return {
            url: '',
            method: 'GET',
          };
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
      }),
      deleteDepartment: build.mutation<{}, { id: number }>({
        query: arg => {
          return {
            url: `/${arg.id}`,
            method: 'DELETE',
          };
        },
      }),
      createDepartment: build.mutation<DepartmentResponse, DepartmentRequest>({
        query: arg => {
          return {
            url: '',
            method: 'POST',
            body: arg,
          };
        },
        invalidatesTags:['DEPARTMENTS']
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
        providesTags:['DEPARTMENTS']
      }),
    };
  },
});

export const {
  useSearchDepartmentsQuery,
  useGetAllDepartmentsQuery,
  useDeleteDepartmentMutation,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;

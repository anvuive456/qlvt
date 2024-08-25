import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagablePayload } from '@/model/payload/pagable-payload';
import {
  CreatePropertyRequest,
  PropertyCondition,
  PropertyResponse,
  PropertyStatus,
  UpdatePropertyRequest,
} from '@/model/payload/property-payload';


export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/tai-san',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
  }),
  tagTypes: ['DEVICES'],
  endpoints(build) {
    return {
      searchProperties: build.query<PagablePayload<PropertyResponse>, {
        page: number;
        size: number;
        maTaiSan?: string;
        status?: string;
        condition?: string;
      }>({
        query: arg => {
          return {
            url: `/search?page=${arg.page}&size=${arg.size}&maTaiSan=${arg.maTaiSan ?? ''}&trangThai=${arg.status || ''}&tinhTrang=${arg.condition || ''}`,
          };
        },
        providesTags: ['DEVICES'],
      }),
      getDetailProperty: build.query<PropertyResponse, { id: string }>({
        query: arg => ({
          url: `/${arg.id}`,
        }),
        transformResponse: (value: { data: PropertyResponse }) => value.data,
      }),
      updateProperty: build.mutation<void, UpdatePropertyRequest>({
        query: ({ id, ...arg }) => ({
          url: `/${id}`,
          method: 'PUT',
          body: arg,
        }),
        invalidatesTags: ['DEVICES'],
      }),
      createProperty: build.mutation<void, CreatePropertyRequest>({
        query: arg => ({
          url: '',
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['DEVICES'],
      }),

      deleteProperty: build.mutation<void, { id: number }>({
        query: ({ id }) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['DEVICES'],
      }),
    };
  },
});

export const {
  useSearchPropertiesQuery,
  useDeletePropertyMutation,
  useGetDetailPropertyQuery,
  useUpdatePropertyMutation,
  useCreatePropertyMutation,
} = propertyApi;

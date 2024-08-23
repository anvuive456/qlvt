import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/uploads',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, Accept: 'application/json' },
    // mode: 'no-cors',
  }),
  endpoints: build => {
    return {
      uploadAvatar: build.mutation<void, { id: number, file: FileList }>({
        query: arg => {
          const formData = new FormData();
          for (const f in arg.file) {
            formData.append('files', arg.file.item(Number(f))!);
          }
          return {
            url: `/avatar/${arg.id}`,
            formData: true,
            method: 'POST',
            body: formData,
          };
        },
      }),
      uploadDeviceImage: build.mutation<void, { id: number, file: FileList }>({
        query: arg => {
          const formData = new FormData();
          for (const f in arg.file) {
            formData.append('files', arg.file.item(Number(f))!);
          }
          return {
            url: `/device/${arg.id}`,
            body: formData,
            method:'POST',
            formData: true,
          };
        },
      }),
    };
  },
});

export const {
  useUploadAvatarMutation,
  useUploadDeviceImageMutation,
} = uploadApi

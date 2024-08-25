import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/hooks/api/auth';
import { userApi } from '@/hooks/api/user';
import authReducer from '@/hooks/reducer/auth-reducer';
import { departmentApi } from '@/hooks/api/department';
import { roomApi } from '@/hooks/api/room';
import { propertyApi } from '@/hooks/api/property';
import { uploadApi } from '@/hooks/api/upload';
import { slipApi } from '@/hooks/api/slip';
import { returnSlipApi } from '@/hooks/api/return-slip';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [departmentApi.reducerPath]: departmentApi.reducer,
      [roomApi.reducerPath]: roomApi.reducer,
      [propertyApi.reducerPath]: propertyApi.reducer,
      [uploadApi.reducerPath]: uploadApi.reducer,
      [slipApi.reducerPath]: slipApi.reducer,
      [returnSlipApi.reducerPath]: returnSlipApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
        userApi.middleware,
        departmentApi.middleware,
        roomApi.middleware,
        propertyApi.middleware,
        uploadApi.middleware,
        slipApi.middleware,
        returnSlipApi.middleware,
      ]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

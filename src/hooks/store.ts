import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/hooks/api/auth';
import { userApi } from '@/hooks/api/user';
import authReducer from '@/hooks/reducer/auth-reducer';
import { departmentApi } from '@/hooks/api/department';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [departmentApi.reducerPath]: departmentApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, departmentApi.middleware]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

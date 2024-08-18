import { User } from '@/model/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '@/hooks/api/auth';

export type AuthReducer = {
  isAuthenticated: boolean;
  token: string;
  user?: User
}

const initialState: AuthReducer = {
  isAuthenticated: false,
  token: ''
};

const authSlice = createSlice({
  initialState: initialState,
  name: 'authSlice',
  reducerPath: 'authSlice',
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthReducer>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const {setAuthState} = authSlice.actions;
export default authSlice.reducer;

import { User } from '@/model/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthContext = {
  isAuthenticated: boolean;
  user?: User
}

const initialState: AuthContext = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  initialState: initialState,
  name: 'authSlice',
  reducerPath: 'authSlice',
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthContext>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});

export const {setAuthState} = authSlice.actions;
export default authSlice.reducer;

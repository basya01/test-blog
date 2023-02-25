import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  id: null | number;
}

const id = localStorage.getItem('auth');
const initialState: AuthState = { id: id ? +id : null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<number>) {
      localStorage.setItem('auth', action.payload.toString());
      state.id = action.payload;
    },
    logout(state) {
      localStorage.removeItem('auth');
      state.id = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

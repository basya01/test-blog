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
      state.id = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models';

const initialState: User[] = [{
  login: 'admin',
  password: '12345',
  id: 0,
}];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models';

const initialState: User[] = [
  {
    id: 0,
    login: 'admin',
    password: '12345',
    name: 'Arsen',
    age: 21,
    city: 'Kharkiv',
    hobbies: ['playing the guitar', 'comuter games', 'movies and series'],
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;

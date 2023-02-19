import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../../models/post';

interface FetchPostsArgs {
  _start: number;
  _limit: number;
}
export const fetchPosts = createAsyncThunk<Post[], FetchPostsArgs>(
  'posts/fetchPosts',
  async ({ _start, _limit }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { data } = await axios.get<Post[]>(`${BASE_URL}/posts`, {
      params: { _start, _limit },
    });

    return data;
  }
);

export enum Status {
  LOADING,
  ERROR,
  SUCCESS,
}

interface PostsState {
  items: Post[];
  status: Status;
}

const initialState: PostsState = { items: [], status: Status.LOADING };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items.push(...action.payload);
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default postsSlice.reducer;

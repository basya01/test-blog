import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../../models';

interface FetchPostsArgs {
  _start: number;
  _limit: number;
}

interface FetchPostsResponse {
  items: Post[];
  totalItems: number;
}

export const fetchPosts = createAsyncThunk<FetchPostsResponse, FetchPostsArgs>(
  'posts/fetchPosts',
  async ({ _start, _limit }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { data, headers } = await axios.get<Post[]>(`${BASE_URL}/posts`, {
      params: { _start, _limit },
    });

    return { items: data, totalItems: headers['x-total-count'] };
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
  totalItems: number;
}

const initialState: PostsState = { items: [], status: Status.LOADING, totalItems: 0 };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePostById(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearPosts(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items.push(...action.payload.items);
        state.totalItems = action.payload.totalItems;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export const { deletePostById, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import posts from './slices/posts';
import users from './slices/users';
import auth from './slices/auth';

export const store = configureStore({
  reducer: {
    posts,
    users,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

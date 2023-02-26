import { useState } from 'react';
import { fetchPosts } from '../store/slices/posts';
import { useAppDispatch } from './redux';

export const useFetchPosts = (limit: number) => {
  const [start, setStart] = useState(0);
  const dispatch = useAppDispatch();

  return {
    start,
    loadMorePosts() {
      dispatch(fetchPosts({ _start: start, _limit: limit }));
      setStart(start + limit);
    },
  };
};

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import { Post } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearPosts, fetchPosts, Status } from '../store/slices/posts';

export const News = () => {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [start, setStart] = useState(0);
  const isFirstRender = useRef(true);
  const limit = 10;

  useEffect(() => {
    if (start === 0) {
      dispatch(fetchPosts({ _start: start, _limit: limit }));
    } else {
      isFirstRender.current && setStart(0);
      dispatch(fetchPosts({ _start: start, _limit: limit }));
    }
    isFirstRender.current && dispatch(clearPosts());
    isFirstRender.current = false;
  }, [start]);

  const onClickLoadMore = () => {
    setStart((start) => start + limit);
  };

  const isMorePosts = posts.totalItems <= start;

  return (
    <>
      <Typography variant="h4" component="h2">
        <Trans ns="news">news</Trans>
      </Typography>
      <Box mt={2} display="flex" flexDirection="column" gap={3}>
        {posts.items.map((item) => (
          <Post key={item.id} id={item.id} title={item.title} body={item.body} />
        ))}
        {posts.status === Status.LOADING && <CircularProgress sx={{ mx: 'auto' }} />}
        {posts.status === Status.ERROR && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <ErrorOutlineIcon fontSize="large" />
              <Typography variant="h4" component="h4">
                <Trans ns="news">error</Trans>
              </Typography>
            </Box>
            <Typography variant="subtitle1" component="p">
              <Trans ns="news">errorMessage</Trans>
            </Typography>
          </Box>
        )}
      </Box>
      {isMorePosts && (
        <Typography variant="body1" component="p" mt={1}>
          <Trans ns="news">noPosts</Trans>
        </Typography>
      )}
      <Button
        disabled={isMorePosts}
        sx={{ mt: 2 }}
        size="large"
        variant="contained"
        onClick={onClickLoadMore}
      >
        <Trans ns="news">load</Trans>
      </Button>
    </>
  );
};

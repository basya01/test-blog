import { Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { Post, PostError } from '../components';
import { useAppDispatch, useAppSelector, useFetchPosts } from '../hooks';
import { clearPosts, Status } from '../store/slices/posts';

export const News = withTranslation('news')(({ t }) => {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const { start, loadMorePosts } = useFetchPosts(10);

  useEffect(() => {
    loadMorePosts();

    return () => {
      dispatch(clearPosts());
    };
  }, []);

  const onClickLoadMore = () => {
    loadMorePosts();
  };

  const isMorePosts = posts.totalItems <= start;

  return (
    <>
      <Typography variant="h4" component="h2">
        {t('news')}
      </Typography>
      <Box mt={2} display="flex" flexDirection="column" gap={3}>
        {posts.items.map((item) => (
          <Post key={item.id} id={item.id} title={item.title} body={item.body} />
        ))}
        {posts.status === Status.LOADING && <CircularProgress sx={{ mx: 'auto' }} />}
        {posts.status === Status.ERROR && <PostError />}
      </Box>
      {isMorePosts && (
        <Typography variant="body1" component="p" mt={1}>
          {t('noPosts')}
        </Typography>
      )}
      <Button
        disabled={isMorePosts}
        sx={{ mt: 2 }}
        size="large"
        variant="contained"
        onClick={onClickLoadMore}
      >
        {t('load')}
      </Button>
    </>
  );
});

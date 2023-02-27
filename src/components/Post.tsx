import { Box, Card, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks/redux';
import { addAlert } from '../store/slices/alerts';
import { deletePostById } from '../store/slices/posts';

interface PostProps {
  id: number;
  title: string;
  body: string;
}

export const Post: React.FC<PostProps> = ({ id, title, body }) => {
  const [delLoading, setDelLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('alerts');

  const onDelete = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    setDelLoading(true);
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`);
      dispatch(deletePostById(id));
    } catch (e) {
      setDelLoading(false);
      dispatch(addAlert({ severity: 'error', text: t('deletePostError') }));
      console.log(e);
    }
  };

  return (
    <Card sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}>
      <Box width="100%">
        <Typography variant="h6" component="h4">
          {title}
        </Typography>
        <Typography variant="body1" component="p">
          {body}
        </Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        {delLoading && <CircularProgress color="error" size={30} />}
        <Button variant="contained" color="error" onClick={onDelete}>
          {t('delete')}
        </Button>
      </Box>
    </Card>
  );
};

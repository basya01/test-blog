import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const PostError = () => {
  const { t } = useTranslation('news');
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box display="flex" alignItems="center" gap={0.5}>
        <ErrorOutlineIcon fontSize="large" />
        <Typography variant="h4" component="h4">
          {t('error')}
        </Typography>
      </Box>
      <Typography variant="subtitle1" component="p">
        {t('errorMessage')}
      </Typography>
    </Box>
  );
};

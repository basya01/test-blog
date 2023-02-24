import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography } from '@mui/material';
import { Trans } from 'react-i18next';

export const PostError = () => {
  return (
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
  );
};

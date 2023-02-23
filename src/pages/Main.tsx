import { Container, Typography } from '@mui/material';
import { Trans } from 'react-i18next';

export const Main = () => {
  return (
    <>
      <Typography variant="h4" component="h2">
        <Trans ns={'main'}>about</Trans>
      </Typography>
      <Typography variant="body1" component="p" maxWidth={650}>
        <Trans ns={'main'}>aboutBody</Trans>
      </Typography>
    </>
  );
};

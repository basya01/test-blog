import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Main = () => {
  const { t } = useTranslation('main');

  return (
    <>
      <Typography variant="h4" component="h2">
        {t('about')}
      </Typography>
      <Typography variant="body1" component="p" maxWidth={650}>
        {t('aboutBody')}
      </Typography>
    </>
  );
};

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import avatar from '../assets/profile_avatar.jpg';
import { useAppSelector } from '../hooks';

export const Profile = () => {
  const userId = useAppSelector((state) => state.auth.id);
  const user = useAppSelector((state) => state.users).find((item) => item.id === userId);
  const { t } = useTranslation('profile');

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h4" component="h2">
        {t('profile')}
      </Typography>
      <Box mt={3} display="flex" gap={4}>
        <img src={avatar} alt="avatar" width={300} />
        <Box>
          <Typography variant="h4" component="h2">
            {user?.name}
          </Typography>
          <Box component="ul" mt={5} display="flex" flexDirection="column" gap={2}>
            <li>
              <p>
                {t('age')}: {user.age || t('unk')}
              </p>
            </li>
            <li>
              <p>
                {t('city')}: {user.city || t('unk')}
              </p>
            </li>
            <li>
              <p>
                {t('hobbies')}: {user.hobbies?.join(', ') || t('unk')}
              </p>
            </li>
          </Box>
        </Box>
      </Box>
    </>
  );
};

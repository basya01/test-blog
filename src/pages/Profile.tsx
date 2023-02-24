import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/profile_avatar.jpg';
import { useAppSelector } from '../hooks/redux';
import { User } from '../models';

export const Profile = () => {
  const userId = useAppSelector((state) => state.auth.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === null) {
      navigate('/');
    }
  }, [userId]);

  const user = useAppSelector((state) => state.users).find((item) => item.id === userId) as User;

  return (
    <>
      <Typography variant="h4" component="h2">
        <Trans ns="profile">profile</Trans>
      </Typography>
      <Box mt={3} display="flex" gap={4}>
        <img src={avatar} alt="avatar" width={300} />
        <Box>
          <Typography variant="h4" component="h2">
            {user.name}
          </Typography>
          <Box component="ul" mt={5} display="flex" flexDirection="column" gap={2}>
            <li>
              <p>
                <Trans ns="profile">age</Trans>: {user.age || <Trans ns="profile">unk</Trans>}
              </p>
            </li>
            <li>
              <p>
                <Trans ns="profile">city</Trans>: {user.city || <Trans ns="profile">unk</Trans>}
              </p>
            </li>
            <li>
              <p>
                <Trans ns="profile">hobbies</Trans>:{' '}
                {user.hobbies?.join(', ') || <Trans ns="profile">unk</Trans>}
              </p>
            </li>
          </Box>
        </Box>
      </Box>
    </>
  );
};

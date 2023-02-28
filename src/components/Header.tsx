import BookIcon from '@mui/icons-material/Book';
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector, useAuth, useTabsNavigation } from '../hooks';
import { AuthModal, LngToggler, ProfileMenu } from './';

export const Header = () => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const userId = useAppSelector((state) => state.auth.id);
  const auth = useAuth();
  const { t } = useTranslation('navigation');

  const tabs = [
    {
      label: t('main'),
      to: '/',
      id: 0,
    },
    {
      label: t('news'),
      to: '/news',
      id: 1,
    },
  ];

  const activeTab = useTabsNavigation(tabs);

  const onSubmitAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { login, password } = e.target as typeof e.target & {
      login: { value: string };
      password: { value: string };
    };

    auth(login.value, password.value) && setIsOpenAuthModal(false);
  };

  const onClickLogin = () => {
    setIsOpenAuthModal(true);
  };

  const onCloseAuthModal = () => {
    setIsOpenAuthModal(false);
  };

  return (
    <>
      <AppBar color="secondary" position="static">
        <Container maxWidth="xl">
          <Toolbar variant="dense" disableGutters component="nav">
            <BookIcon color="primary" sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                mr: 10,
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
              color="primary"
            >
              BLOG
            </Typography>
            <Tabs value={activeTab} aria-label="basic tabs example">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  sx={{ paddingY: 3, fontSize: '15px' }}
                  label={tab.label}
                  value={tab.id}
                  to={tab.to}
                  component={Link}
                />
              ))}
            </Tabs>
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <LngToggler />
              {userId !== null ? (
                <ProfileMenu />
              ) : (
                <Button variant="contained" size="large" onClick={onClickLogin}>
                  {t('login')}
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AuthModal open={isOpenAuthModal} onClose={onCloseAuthModal} onSubmit={onSubmitAuth} />
    </>
  );
};

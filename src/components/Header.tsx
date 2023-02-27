import BookIcon from '@mui/icons-material/Book';
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { useAuth } from '../hooks/useAuth';
import { AuthModal, LngToggler, ProfileMenu } from './';

export const Header = () => {
  const [activeTab, setActiveTab] = useState<number | false>(0);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const userId = useAppSelector((state) => state.auth.id);
  const { pathname } = useLocation();
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

  useEffect(() => {
    const isTabExist = tabs.find((tab) => tab.to === pathname);
    if (!isTabExist) {
      setActiveTab(false);
      return;
    }
    setActiveTab(isTabExist.id);
  }, [pathname]);

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
          <Toolbar variant="dense" disableGutters>
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

            <Box sx={{ ml: 'auto', display: 'flex', gap: 4 }}>
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

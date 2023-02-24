import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import blue from '@mui/material/colors/blue';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container } from '@mui/system';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertsContext } from '../App';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { login } from '../store/slices/auth';
import { AuthModal } from './';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#fff',
    },
  },
});

const tabs = [
  {
    label: 'Home',
    to: '/',
    id: 0,
  },
  {
    label: 'News',
    to: '/news',
    id: 1,
  },
];

export const Header = () => {
  const [activeTab, setActiveTab] = useState<number | false>(0);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const userId = useAppSelector((state) => state.auth.id);
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { addAlert } = useContext(AlertsContext);

  const onChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const onSubmitAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      login: { value: string };
      password: { value: string };
    };

    const authUser = users.find((user) => user.password === target.password.value);
    if (!authUser) {
      addAlert({ severity: 'error', text: 'You entered incorrect login or password' });
      return;
    }
    dispatch(login(authUser.id));
    addAlert({ severity: 'success', text: 'You are logged in' }), setIsOpenAuthModal(false);
  };

  const onClickLogin = () => {
    setIsOpenAuthModal(true);
  };

  const onCloseAuthModal = () => {
    setIsOpenAuthModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="secondary" position="static">
        <Container maxWidth="xl">
          <Toolbar variant="dense" disableGutters>
            <BookIcon color="primary" sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                mr: 10,
                color: blue[500],
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
            >
              BLOG
            </Typography>
            <Tabs value={activeTab} onChange={onChangeTabs} aria-label="basic tabs example">
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
            <Box sx={{ ml: 'auto' }}>
              {userId !== null ? (
                <Link to="/profile" onClick={() => setActiveTab(false)}>
                  <AccountCircleIcon fontSize="large" color="primary" to="/profile" />
                </Link>
              ) : (
                <Button variant="contained" size="large" onClick={onClickLogin}>
                  Log in
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AuthModal open={isOpenAuthModal} onClose={onCloseAuthModal} onSubmit={onSubmitAuth} />
    </ThemeProvider>
  );
};

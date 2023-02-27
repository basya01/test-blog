import { Container, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Alerts, Header } from './components';
import { Main, News, Profile } from './pages';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Container sx={{ my: 6 }} maxWidth="xl" component="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
        <Alerts />
      </div>
    </ThemeProvider>
  );
};

export default App;

import { Container, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Alerts, Header } from './components';
import { Alert } from './models';
import { Main, News, Profile } from './pages';
import { theme } from './theme';

interface AlertsContextValue {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  deleteAlert: (id: number) => void;
}

export const AlertsContext = React.createContext<AlertsContextValue>({
  alerts: [],
  addAlert: () => {},
  deleteAlert: () => {},
});

const App = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (alert: Omit<Alert, 'id'>) => {
    setAlerts((prev) => [...prev, { ...alert, id: Date.now() }]);
  };

  const deleteAlert = (id: number) => {
    setAlerts((alerts) => alerts.filter((item) => id !== item.id));
  };

  return (
    <ThemeProvider theme={theme}>
      <AlertsContext.Provider value={{ alerts, addAlert, deleteAlert }}>
        <div className="App">
          <Header />
          <Container sx={{ my: 6 }} maxWidth="xl" component="main">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/news" element={<News />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Container>
          <Alerts alerts={alerts} />
        </div>
      </AlertsContext.Provider>
    </ThemeProvider>
  );
};

export default App;

import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Alerts, Header } from './components';
import { Alert, Severity } from './models';
import { Main, News, Profile } from './pages';

interface IAlertsContext {
  alerts: Alert[];
  addAlert: (alert: {text: string, severity: Severity}) => void;
  deleteAlert: (id: number) => void;
}

export const AlertsContext = React.createContext<IAlertsContext>({
  alerts: [],
  addAlert: () => {},
  deleteAlert: () => {},
});

const App = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // const addAlert = (alert: Alert) => {
  //   setAlerts([...alerts, alert]);

  //   setTimeout(() => {
  //     setAlerts(alerts.filter((item) => alert.id !== item.id));
  //   }, 3000);
  // };

  const addAlert = (alert: {text: string, severity: Severity}) => {
    setAlerts((prev) => [...prev, {...alert, id: Date.now()}]);
  };

  const deleteAlert = (id: number) => {
    setAlerts((alerts) => alerts.filter((item) => id !== item.id));
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, deleteAlert }}>
      <div className="App">
        <Header />
        <Container sx={{ my: 6 }} maxWidth='xl'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
        <Alerts alerts={alerts} />
      </div>
    </AlertsContext.Provider>
  );
};

export default App;

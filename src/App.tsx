import React, { useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header, Alerts } from './components';
import { Alert } from './models/alert';
import { Main, News, Profile } from './pages';

interface IAlertsContext {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
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

  const addAlert = (alert: Alert) => {
    setAlerts((prev) => [...prev, alert]);
  };

  const deleteAlert = (id: number) => {
    setAlerts((alerts) => alerts.filter((item) => id !== item.id));
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, deleteAlert }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Alerts alerts={alerts} />
      </div>
    </AlertsContext.Provider>
  );
};

export default App;

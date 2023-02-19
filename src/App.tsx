import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './pages/Main';
import { News } from './pages/News';
import { Profile } from './pages/Profile';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;

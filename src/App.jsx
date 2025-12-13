import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import TechnologyEdit from './pages/TechnologyEdit';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="app">
        <Routes>
          <Route path="/" element={<TechnologyList />} />
          <Route path="/technology/:id" element={<TechnologyDetail />} />
          <Route path="/edit/:id" element={<TechnologyEdit />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
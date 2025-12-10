import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TechnologyList />} />
          <Route path="/technology/:id" element={<TechnologyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
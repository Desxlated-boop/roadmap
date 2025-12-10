import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import TechnologyEdit from './pages/TechnologyEdit.jsx';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TechnologyList />} />
          <Route path="/technology/:id" element={<TechnologyDetail />} />
          <Route path="/edit/:id" element={<TechnologyEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
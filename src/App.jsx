import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';

function App() {
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' },
    { id: 4, title: 'Props and Lifting State', description: 'Передача данных между компонентами', status: 'not-started' },
    { id: 5, title: 'Hooks Basics', description: 'Введение в хуки React', status: 'not-started' }
  ]);

  const updateStatus = (id) => {
    setTechnologies(prev => prev.map(tech => {
      if (tech.id === id) {
        let newStatus;
        if (tech.status === 'not-started') newStatus = 'in-progress';
        else if (tech.status === 'in-progress') newStatus = 'completed';
        else newStatus = 'not-started';
        return { ...tech, status: newStatus };
      }
      return tech;
    }));
  };

    const [filter, setFilter] = useState('all');

    const filteredTechnologies = technologies.filter(tech => {
        if (filter === 'all') return true;
        return tech.status === filter;
    });

    return (
        <div className="app">
            <h1>Трекер изучения технологий</h1>

            <ProgressHeader technologies={technologies} />

            <div className="filters">
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('not-started')}>Не начато</button>
                <button onClick={() => setFilter('in-progress')}>В процессе</button>
                <button onClick={() => setFilter('completed')}>Завершено</button>
            </div>

            <QuickActions setTechnologies={setTechnologies} />

            <div className="technology-list">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        onUpdateStatus={() => updateStatus(tech.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
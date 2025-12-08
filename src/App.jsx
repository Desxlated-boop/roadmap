import { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';

function App() {
  const [technologies, setTechnologies] = useState([]);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    } else {
      // Если ничего нет, инициализируем дефолт
      setTechnologies([
        { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
        { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '' },
        { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' },
        { id: 4, title: 'Props and Lifting State', description: 'Передача данных между компонентами', status: 'not-started', notes: '' },
        { id: 5, title: 'Hooks Basics', description: 'Введение в хуки React', status: 'not-started', notes: '' }
      ]);
    }
  }, []);

  // Функция обновления статуса + сохранение в localStorage
  const updateStatus = (id) => {
    setTechnologies(prev => {
      const newTechs = prev.map(tech => {
        if (tech.id === id) {
          const newStatus = tech.status === 'not-started' ? 'in-progress' : tech.status === 'in-progress' ? 'completed' : 'not-started';
          return { ...tech, status: newStatus };
        }
        return tech;
      });
      localStorage.setItem('techTrackerData', JSON.stringify(newTechs));
      return newTechs;
    });
  };

  // Функция обновления заметок + сохранение в localStorage
  const updateNotes = (id, newNotes) => {
    setTechnologies(prev => {
      const newTechs = prev.map(tech => tech.id === id ? { ...tech, notes: newNotes } : tech);
      localStorage.setItem('techTrackerData', JSON.stringify(newTechs));
      return newTechs;
    });
  };

  return (
    <div className="app">
      <h1>Трекер изучения технологий</h1>
      <div className="technology-list">
        {technologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            notes={tech.notes}
            onStatusChange={() => updateStatus(tech.id)}
            onNotesChange={updateNotes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
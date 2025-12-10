// src/hooks/useTechnologies.jsx
import useLocalStorage from './useLocalStorage.jsx';
import { useState } from 'react';

const defaultData = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' },
  { id: 4, title: 'Props and Lifting State', description: 'Передача данных между компонентами', status: 'not-started', notes: '' },
  { id: 5, title: 'Hooks Basics', description: 'Введение в хуки React', status: 'not-started', notes: '' }
];

export default function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', defaultData);
  const [filter, setFilter] = useState('all');

  const updateStatus = (id) => {
    setTechnologies(prev => prev.map(t =>
      t.id === id
        ? { ...t, status: t.status === 'not-started' ? 'in-progress' : t.status === 'in-progress' ? 'completed' : 'not-started' }
        : t
    ));
  };

  const updateNotes = (id, text) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, notes: text } : t));
  };

  const markAllCompleted = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  const resetAll = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started' })));

  const filtered = technologies.filter(t => filter === 'all' || t.status === filter);
  const progress = technologies.length ? Math.round(technologies.filter(t => t.status === 'completed').length / technologies.length * 100) : 0;

  const randomNext = () => {
      setTechnologies(prev => {
          const notStarted = prev.filter(t => t.status === 'not-started');
          if (notStarted.length === 0) return prev;
          const random = notStarted[Math.floor(Math.random() * notStarted.length)];
          return prev.map(t => t.id === random.id ? { ...t, status: 'in-progress' } : t);
      });
  };

  return {
    technologies: filtered,
    allTechnologies: technologies,
    filter, setFilter,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    randomNext,
    progress
  };
}
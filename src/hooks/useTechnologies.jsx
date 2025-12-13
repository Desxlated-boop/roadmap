import useLocalStorage from './useLocalStorage.jsx';
import { useState } from 'react';

const defaultData = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '', startDate: null, endDate: null },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '', startDate: null, endDate: null },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '', startDate: null, endDate: null },
  { id: 4, title: 'Props and Lifting State', description: 'Передача данных между компонентами', status: 'not-started', notes: '', startDate: null, endDate: null },
  { id: 5, title: 'Hooks Basics', description: 'Введение в хуки React', status: 'not-started', notes: '', startDate: null, endDate: null }
];

export default function useTechnologies() {
  const [allTechnologies, setAllTechnologies] = useLocalStorage('techTrackerData', defaultData);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOneTechnology = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('https://api.github.com/repositories?since=' + Math.floor(Math.random() * 500));
      if (!res.ok) throw new Error('GitHub API не отвечает');

      const repos = await res.json();
      const randomRepo = repos[Math.floor(Math.random() * repos.length)];

      const newTech = {
        id: Date.now(),
        title: randomRepo.name || 'Unknown Tech',
        description: randomRepo.description || 'Popular open-source project on GitHub',
        status: 'not-started',
        notes: '',
        startDate: null, 
        endDate: null
      };

      setAllTechnologies(prev => [...prev, newTech]);

    } catch (err) {
      setError('Ошибка загрузки: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (id) => {
    setAllTechnologies(prev => prev.map(t =>
      t.id === id
        ? { ...t, status: t.status === 'not-started' ? 'in-progress' : t.status === 'in-progress' ? 'completed' : 'not-started' }
        : t
    ));
  };

  const updateNotes = (id, text) => {
    setAllTechnologies(prev => prev.map(t => t.id === id ? { ...t, notes: text } : t));
  };

  const markAllCompleted = () => setAllTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  const resetAll = () => setAllTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started', notes: '' })));

  const randomNext = () => {
    setAllTechnologies(prev => {
      const notStarted = prev.filter(t => t.status === 'not-started');
      if (notStarted.length === 0) return prev;
      const random = notStarted[Math.floor(Math.random() * notStarted.length)];
      return prev.map(t => t.id === random.id ? { ...t, status: 'in-progress' } : t);
    });
  };

  const filtered = allTechnologies
    .filter(t => filter === 'all' || t.status === filter)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const progress = allTechnologies.length
    ? Math.round(allTechnologies.filter(t => t.status === 'completed').length / allTechnologies.length * 100)
    : 0;

  const addTechnology = (newTech) => {
    setAllTechnologies(prev => [...prev, { ...newTech, id: Date.now(), status: 'not-started', notes: '' }]);
  };

  const updateTechnology = (updatedTech) => {
    setAllTechnologies(prev => prev.map(t => t.id === updatedTech.id ? updatedTech : t));
  };

  const deleteTechnology = (id) => {
    setAllTechnologies(prev => prev.filter(t => t.id !== id));
  };

  // ФУНКЦИЯ УДАЛЕНИЯ СРОКОВ - ДОБАВЛЯЕМ
  const clearDeadline = (id) => {
    setAllTechnologies(prev => prev.map(t =>
      t.id === id ? { ...t, startDate: null, endDate: null } : t
    ));
  };

  return {
    technologies: filtered,
    filter, setFilter,
    search, setSearch,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    randomNext,
    progress,
    loading,
    error,
    loadOneTechnology,
    addTechnology,
    updateTechnology,
    deleteTechnology,
    clearDeadline,
    setAllTechnologies: setAllTechnologies,
  };
}
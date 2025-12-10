import useTechnologies from './hooks/useTechnologies.jsx';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';

function App() {
  const {
    technologies,
    filter,
    setFilter,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    randomNext,
    progress
  } = useTechnologies();

  return (
    <div className="app">
      <h1>Трекер изучения технологий</h1>

      <ProgressHeader progress={progress} />

      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('not-started')}>Не начато</button>
        <button onClick={() => setFilter('in-progress')}>В процессе</button>
        <button onClick={() => setFilter('completed')}>Завершено</button>
      </div>

      <QuickActions markAllCompleted={markAllCompleted} resetAll={resetAll} randomNext={randomNext}/>

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
            onNotesChange={(text) => updateNotes(tech.id, text)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
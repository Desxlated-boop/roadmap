import useTechnologies from '../hooks/useTechnologies.jsx';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import { Link } from 'react-router-dom';

function TechnologyList() {
  const {
    technologies,
    filter,
    setFilter,
    search,
    setSearch,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    randomNext,
    progress,
    loading,
    error,
    loadOneTechnology
  } = useTechnologies();

  return (
    <div>
      <h1>Трекер изучения технологий</h1>
      <ProgressHeader progress={progress} />
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <button
          onClick={loadOneTechnology}
          disabled={loading}
          style={{
            padding: '14px 32px',
            backgroundColor: loading ? '#666' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Загрузка...' : 'Загрузить одну технологию с сервера'}
        </button>

        {error && (
          <div style={{ marginTop: '15px', color: '#ff6b6b' }}>
            <p>{error}</p>
            <button onClick={loadOneTechnology} style={{ background: '#0066cc', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px' }}>
              Попробовать снова
            </button>
          </div>
        )}
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('not-started')}>Не начато</button>
        <button onClick={() => setFilter('in-progress')}>В процессе</button>
        <button onClick={() => setFilter('completed')}>Завершено</button>
      </div>

      <QuickActions markAllCompleted={markAllCompleted} resetAll={resetAll} randomNext={randomNext} />

      <div className="technology-list">
        {technologies.map(tech => (
          <div key={tech.id}>
            <TechnologyCard
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes}
              onStatusChange={() => updateStatus(tech.id)}
              onNotesChange={(text) => updateNotes(tech.id, text)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologyList;
import { useParams, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies.jsx';

export default function TechnologyEdit() {
  const { id } = useParams();
  const { technologies, updateNotes } = useTechnologies();
  const tech = technologies.find(t => t.id === Number(id));

  if (!tech) return <div style={{padding: '40px', color: 'white'}}>Технология не найдена</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      {/* КНОПКА НАЗАД — КРАСИВАЯ И ВИДИМАЯ */}
      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          padding: '10px 16px',
          backgroundColor: '#0066cc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}
      >
        ← Назад к списку
      </Link>

      <h2 style={{ color: 'white' }}>Редактирование: {tech.title}</h2>
      <p style={{ color: '#aaa' }}>{tech.description}</p>

      <h3 style={{ color: 'white', marginTop: '30px' }}>Заметки</h3>
      <textarea
        value={tech.notes}
        onChange={(e) => updateNotes(tech.id, e.target.value)}
        rows="12"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: '1px solid #444',
          borderRadius: '8px',
          fontSize: '16px'
        }}
      />
    </div>
  );
}
import { useParams, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies.jsx';

function TechnologyDetail() {
  const { id } = useParams();
  const { technologies, updateStatus, updateNotes } = useTechnologies();
  const tech = technologies.find(t => t.id === Number(id));

  if (!tech) return <h2>Технология не найдена</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">← Назад к списку</Link>
      <h2>{tech.title}</h2>
      <p><strong>Описание:</strong> {tech.description}</p>
      <p><strong>Статус:</strong> {tech.status}</p>
      
      <h3>Заметки:</h3>
      <textarea
        value={tech.notes}
        onChange={(e) => updateNotes(tech.id, e.target.value)}
        rows="6"
        style={{ width: '100%', padding: '10px' }}
      />

      <br /><br />
      <button onClick={() => updateStatus(tech.id)}>
        Изменить статус
      </button>
    </div>
  );
}

export default TechnologyDetail;
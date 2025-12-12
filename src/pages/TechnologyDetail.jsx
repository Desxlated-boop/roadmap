import { useParams, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies.jsx';
import { useState } from 'react';

export default function TechnologyDetail() {
  const { id } = useParams();
  const { technologies, updateStatus, updateNotes } = useTechnologies();
  const tech = technologies.find(t => t.id === Number(id));

  const [wikiInfo, setWikiInfo] = useState('');
  const [wikiLoading, setWikiLoading] = useState(false);

  const loadWiki = async () => {
    setWikiLoading(true);
    setWikiInfo('');
    try {
      const title = encodeURIComponent(tech.title.split(' ')[0]);
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      const data = await res.json();
      setWikiInfo(data.extract || 'Информация не найдена в Wikipedia');
    } catch (err) {
      setWikiInfo('Не удалось загрузить данные из Wikipedia');
    } finally {
      setWikiLoading(false);
    }
  };

  if (!tech) {
    return <div style={{ padding: '40px', color: 'white' }}>Технология не найдена</div>;
  }

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
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

      <h2 style={{ color: 'white' }}>{tech.title}</h2>
      <p style={{ color: '#aaa' }}>{tech.description}</p>

      <h3 style={{ color: 'white', marginTop: '30px' }}>Заметки</h3>
      <textarea
        value={tech.notes}
        onChange={(e) => updateNotes(tech.id, e.target.value)}
        rows="10"
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

      <div style={{ marginTop: '40px' }}>
        <button
          onClick={loadWiki}
          disabled={wikiLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: wikiLoading ? '#666' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: wikiLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {wikiLoading ? 'Загрузка...' : 'Загрузить информацию из Wikipedia'}
        </button>

        {wikiInfo && (
          <div style={{ marginTop: '20px', color: '#ccc', lineHeight: '1.6' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Из Wikipedia:</h4>
            <p style={{ margin: 0 }}>{wikiInfo}</p>
          </div>
        )}
      </div>

      <br /><br />
      <button
        onClick={() => updateStatus(tech.id)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Следующий статус
      </button>
    </div>
  );
}
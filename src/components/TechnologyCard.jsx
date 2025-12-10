import './TechnologyCard.css';
import { Link } from 'react-router-dom';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const statusText = status === 'completed' ? 'Завершено' : status === 'in-progress' ? 'В процессе' : 'Не начато';
  const className = `technology-card ${status}`;

  return (
    <div className={className}>
      <div className="card-header" onClick={onStatusChange}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Статус: {statusText}</p>
      </div>
      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={notes}
          onChange={(e) => {
            e.stopPropagation();
            onNotesChange(e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          placeholder="Записывайте заметки здесь..."
          rows="4"
        />
        <Link to={`/edit/${id}`}>Редактировать заметки</Link>
      </div>
      <Link to={`/technology/${id}`} style={{ display: 'block', marginTop: '10px' }}>
        Подробно →
      </Link>
    </div>
  );
}

export default TechnologyCard;
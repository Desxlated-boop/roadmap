import './TechnologyCard.css';

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
          onChange={(e) => onNotesChange(id, e.target.value)}
          placeholder="Записывайте заметки здесь..."
          rows="4"
        />
      </div>
    </div>
  );
}

export default TechnologyCard;
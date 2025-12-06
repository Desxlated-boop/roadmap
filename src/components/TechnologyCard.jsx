import './TechnologyCard.css';

function TechnologyCard({ title, description, status, onUpdateStatus }) {
  let statusText = '';
  let className = 'technology-card';

  if (status === 'completed') {
    statusText = 'Завершено';
    className += ' completed';
  } else if (status === 'in-progress') {
    statusText = 'В процессе';
    className += ' in-progress';
  } else if (status === 'not-started') {
    statusText = 'Не начато';
    className += ' not-started';
  }

  return (
    <div className={className} onClick={onUpdateStatus}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Статус: {statusText}</p>
    </div>
  );
}

export default TechnologyCard;
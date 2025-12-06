import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  let progressClass = 'progress';
  if (percentage === 100) {
    progressClass += ' full';
  } else if (percentage > 0) {
    progressClass += ' partial';
  }

  return (
    <div className="progress-header">
      <h2>Прогресс изучения</h2>
      <p>Всего технологий: {total}</p>
      <p>Изучено: {completed}</p>
      <div className="progress-bar">
        <div className={progressClass} style={{ width: `${percentage}%` }}></div>
      </div>
      <p>{percentage.toFixed(2)}% завершено</p>
    </div>
  );
}

export default ProgressHeader;
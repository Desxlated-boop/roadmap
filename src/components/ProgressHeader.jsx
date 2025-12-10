// src/components/ProgressHeader.jsx
import './ProgressHeader.css';

function ProgressHeader({ progress }) {
  let progressClass = 'progress';
  if (progress === 100) progressClass += ' full';
  else if (progress > 0) progressClass += ' partial';

  return (
    <div className="progress-header">
      <h2>Прогресс изучения</h2>
      <div className="progress-bar">
        <div className={progressClass} style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}% завершено</p>
    </div>
  );
}

export default ProgressHeader;
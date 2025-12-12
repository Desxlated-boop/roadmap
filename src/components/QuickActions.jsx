import './QuickActions.css';

function QuickActions({ markAllCompleted, resetAll, randomNext }) {
  return (
    <div className="quick-actions">
      <button onClick={markAllCompleted}>Отметить все как выполненные</button>
      <button onClick={resetAll}>Сбросить все статусы</button>
      <button onClick={randomNext}>Случайный выбор следующей технологии</button>
    </div>
  );
}

export default QuickActions;
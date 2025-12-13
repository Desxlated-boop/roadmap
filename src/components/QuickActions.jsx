// src/components/QuickActions.jsx
import { ButtonGroup, Button, Tooltip, Box } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';

function QuickActions({ markAllCompleted, resetAll, randomNext }) {
  return (
    <Box sx={{ 
      mb: 3, 
      display: 'flex', 
      justifyContent: 'center',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 1
    }}>
      <ButtonGroup 
        variant="contained" 
        sx={{ 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          '& .MuiButton-root': {
            fontSize: { xs: '0.8rem', sm: '0.9rem' }
          }
        }}
      >
        <Tooltip title="Отметить все как выполненные">
          <Button 
            onClick={markAllCompleted}
            startIcon={<DoneAllIcon />}
            color="success"
            aria-label="Отметить все технологии как выполненные"
          >
            Все выполнены
          </Button>
        </Tooltip>
        <Tooltip title="Сбросить все статусы">
          <Button 
            onClick={resetAll}
            startIcon={<RestartAltIcon />}
            color="warning"
            aria-label="Сбросить статусы всех технологий"
          >
            Сбросить статусы
          </Button>
        </Tooltip>
        <Tooltip title="Выбрать случайную технологию для изучения">
          <Button 
            onClick={randomNext}
            startIcon={<ShuffleIcon />}
            color="secondary"
            aria-label="Выбрать случайную технологию для изучения"
          >
            Случайная
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
}

export default QuickActions;
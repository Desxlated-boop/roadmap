import { Box, Typography, LinearProgress, Grid, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ProgressHeader({ progress, technologies = [] }) {
  const theme = useTheme();
  
  const stats = {
    total: technologies.length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    completed: technologies.filter(t => t.status === 'completed').length,
  };

  const calculatedProgress = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const getProgressColor = () => {
    if (calculatedProgress === 100) return 'success';
    if (calculatedProgress > 0) return 'primary';
    return 'inherit';
  };

  return (
    <Box sx={{ 
      backgroundColor: 'background.paper', 
      p: 3, 
      borderRadius: 2, 
      mb: 3,
      border: 1,
      borderColor: 'divider',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        📊 Статистика изучения
      </Typography>
      
      {/* Прогресс-бар */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={calculatedProgress} 
            color={getProgressColor()}
            sx={{ 
              height: 16, 
              borderRadius: 8,
              backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 8,
              }
            }} 
          />
        </Box>
        <Typography variant="h6" sx={{ minWidth: 60, fontWeight: 'bold', color: 'text.primary' }}>
          {calculatedProgress}%
        </Typography>
      </Box>
      
      {/* Статистика по статусам */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
              {stats.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Всего
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ 
              color: 'error.main', 
              fontWeight: 'bold',
              fontSize: '1.8rem'
            }}>
              {stats.notStarted}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Не начато
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ 
              color: 'warning.main', 
              fontWeight: 'bold',
              fontSize: '1.8rem'
            }}>
              {stats.inProgress}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              В процессе
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ 
              color: 'success.main', 
              fontWeight: 'bold',
              fontSize: '1.8rem'
            }}>
              {stats.completed}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Завершено
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
        {calculatedProgress === 100 ? 'Все технологии изучены!' : 
         calculatedProgress >= 50 ? 'Неплохо, неплохо' : 
         'Изучаем дальше'}
      </Typography>
    </Box>
  );
}

export default ProgressHeader;
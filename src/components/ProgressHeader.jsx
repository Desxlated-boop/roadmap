// src/components/ProgressHeader.jsx
import { Box, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ProgressHeader({ progress }) {
  const theme = useTheme();
  
  const getProgressColor = () => {
    if (progress === 100) return 'success';
    if (progress > 0) return 'primary';
    return 'inherit';
  };

  return (
    <Box sx={{ 
      backgroundColor: 'background.paper', 
      p: 3, 
      borderRadius: 2, 
      mb: 3,
      textAlign: 'center',
      border: 1,
      borderColor: 'divider',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        📊 Прогресс изучения
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
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
          {progress}%
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        {progress === 100 ? 'Все технологии изучены!' : 'Маловато, изучаем дальше'}
      </Typography>
    </Box>
  );
}

export default ProgressHeader;
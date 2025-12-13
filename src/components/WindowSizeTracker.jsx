import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletIcon from '@mui/icons-material/Tablet';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

export default function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getScreenType = () => {
    if (windowSize.width < 768) return {
      type: 'мобильный',
      icon: <PhoneAndroidIcon />,
      color: 'primary'
    };
    if (windowSize.width < 1024) return {
      type: 'планшет', 
      icon: <TabletIcon />,
      color: 'secondary'
    };
    return {
      type: 'десктоп',
      icon: <DesktopWindowsIcon />,
      color: 'success'
    };
  };

  const screenInfo = getScreenType();

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Отслеживание размера окна
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">Ширина</Typography>
          <Typography variant="h4">{windowSize.width} px</Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary">Высота</Typography>
          <Typography variant="h4">{windowSize.height} px</Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary">Тип экрана</Typography>
          <Chip
            icon={screenInfo.icon}
            label={screenInfo.type}
            color={screenInfo.color}
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>
      
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Измените размер окна браузера, чтобы увидеть обновление
      </Typography>
    </Paper>
  );
}
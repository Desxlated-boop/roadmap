import { AppBar, Toolbar, Button, Box, Typography, Container, IconButton, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Navigation({ toggleTheme, themeMode }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Технологии', icon: <ListAltIcon /> },
    { path: '/stats', label: 'Статистика', icon: <BarChartIcon /> },
    { path: '/settings', label: 'Настройки', icon: <SettingsIcon /> },
  ];

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="md">
        <Toolbar sx={{ px: { xs: 1, sm: 2 }, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScienceIcon />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              TechTracker
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                variant={location.pathname === item.path ? "contained" : "text"}
                sx={{
                  color: location.pathname === item.path ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: location.pathname === item.path ? 'primary.dark' : 'transparent',
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
            
            <Tooltip title={themeMode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}>
              <IconButton
                onClick={toggleTheme}
                sx={{ color: 'white', ml: 1 }}
                aria-label="Сменить тему"
              >
                {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
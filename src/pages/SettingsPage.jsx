import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  Slider
} from '@mui/material';
import Counter from '../components/Counter';
import WindowSizeTracker from '../components/WindowSizeTracker';
import UserProfile from '../components/UserProfile';
import ColorPicker from '../components/ColorPicker';
import ContactForm from '../components/ContactForm';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem('theme') === 'dark',
    notifications: true,
    autoSave: true,
    itemsPerPage: 10,
  });
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'darkMode') {
      localStorage.setItem('theme', value ? 'dark' : 'light');
      window.location.reload();
    }
  };

  const handleReset = () => {
    localStorage.clear();
    setResetConfirm(false);
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        ⚙️ Настройки приложения
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Основные настройки
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
            }
            label="Тёмная тема"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
            }
            label="Уведомления"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              />
            }
            label="Автосохранение"
          />
          
          <Box>
            <Typography gutterBottom>Элементов на странице: {settings.itemsPerPage}</Typography>
            <Slider
              value={settings.itemsPerPage}
              onChange={(_, value) => handleSettingChange('itemsPerPage', value)}
              min={5}
              max={50}
              step={5}
              marks
            />
          </Box>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Примеры компонентов
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Демонстрация компонентов:
        </Typography>
        
        <Counter />
        <WindowSizeTracker />
        <UserProfile />
        <ColorPicker />
        <ContactForm />
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom color="error">
          Опасная зона
        </Typography>
        
        {resetConfirm ? (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Вы уверены? Это удалит все сохранённые данные.
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button variant="contained" color="error" size="small" onClick={handleReset}>
                Да, сбросить всё
              </Button>
              <Button variant="outlined" size="small" onClick={() => setResetConfirm(false)}>
                Отмена
              </Button>
            </Box>
          </Alert>
        ) : (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setResetConfirm(true)}
          >
            Сбросить все настройки и данные
          </Button>
        )}
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          Версия приложения: 1.0.0
        </Typography>
      </Paper>
    </Container>
  );
}
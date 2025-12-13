import { useState, useEffect, useMemo } from 'react';
import useTechnologies from '../hooks/useTechnologies.jsx';
import MUITechCard from '../components/MUITechCard';
import TechnologyForm from '../components/TechnologyForm';
import DeadlineForm from '../components/DeadlineForm';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import {
  Container, Typography, Button, ButtonGroup, Box, Fab, Snackbar, Alert,
  IconButton, Switch, FormControlLabel, Tooltip, CircularProgress,
  TextField, InputAdornment, Paper, useTheme
} from '@mui/material';
import { LightMode, DarkMode, Download, Upload, Add, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';

export default function TechnologyList() {
  const theme = useTheme();
  const {
    technologies,
    filter, setFilter,
    progress,
    updateStatus, updateNotes, updateTechnology,
    markAllCompleted, resetAll, randomNext,
    addTechnology, deleteTechnology,
    loading, error, loadOneTechnology,
    search, setSearch,
    setAllTechnologies,
    clearDeadline
  } = useTechnologies();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [deadlineOpen, setDeadlineOpen] = useState(false);
  const [currentTech, setCurrentTech] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'dark');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Принудительно перезагружаем страницу для применения темы
    window.location.reload();
  };

  const showSnack = (message, severity = 'success') => {
    setSnack({ open: true, message, severity });
  };

  const handleExport = () => {
    const data = JSON.stringify(technologies, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technologies.json';
    a.click();
    showSnack('Экспортировано успешно');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) {
          setAllTechnologies(data);
          showSnack(`Импортировано ${data.length} технологий`);
        } else {
          showSnack('Неверный формат данных', 'error');
        }
      } catch {
        showSnack('Неверный формат файла', 'error');
      }
    };
    reader.readAsText(file);
  };

  const toggleSelect = (id) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" component="h1" sx={{ color: 'text.primary' }}>
          Трекер изучения технологий
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Экспорт">
            <IconButton onClick={handleExport} sx={{ color: 'text.secondary' }}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Импорт">
            <IconButton component="label" sx={{ color: 'text.secondary' }}>
              <Upload />
              <input type="file" hidden accept=".json" onChange={handleImport} />
            </IconButton>
          </Tooltip>
          
          {/* Переключатель темы */}
          <Tooltip title={themeMode === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}>
            <FormControlLabel
              control={
                <Switch
                  checked={themeMode === 'light'}
                  onChange={toggleTheme}
                  color="default"
                  inputProps={{ 
                    'aria-label': 'Переключить тему',
                    'role': 'switch'
                  }}
                />
              }
              label={
                themeMode === 'light' ? (
                  <LightMode sx={{ color: 'warning.main' }} />
                ) : (
                  <DarkMode sx={{ color: 'primary.main' }} />
                )
              }
              sx={{ m: 0 }}
              aria-label={`Текущая тема: ${themeMode === 'dark' ? 'тёмная' : 'светлая'}`}
            />
          </Tooltip>
        </Box>
      </Box>

      <ProgressHeader progress={progress} technologies={technologies} />
      
      <TextField
        label="Поиск технологий"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Введите название..."
      />
      
      <Box textAlign="center" my={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={loadOneTechnology}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Загружается...' : 'Загрузить случайную технологию с GitHub'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>{error}</Alert>}
      </Box>

      <ButtonGroup fullWidth sx={{ mb: 3 }}>
        {['all', 'not-started', 'in-progress', 'completed'].map(f => (
          <Button
            key={f}
            variant={filter === f ? 'contained' : 'outlined'}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Все' : f === 'not-started' ? 'Не начато' : f === 'in-progress' ? 'В процессе' : 'Завершено'}
          </Button>
        ))}
      </ButtonGroup>

      {selected.size > 0 && (
        <Paper 
          elevation={3}
          sx={{ 
            p: 2, 
            mb: 2, 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            backgroundColor: themeMode === 'dark' ? 'rgba(100, 108, 255, 0.2)' : 'rgba(100, 108, 255, 0.1)',
            border: `1px solid ${themeMode === 'dark' ? 'rgba(100, 108, 255, 0.3)' : 'rgba(100, 108, 255, 0.2)'}`
          }}
        >
          <Typography variant="body2" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Выбрано: {selected.size}
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              selected.forEach(id => updateStatus(id));
              showSnack(`Статус обновлён у ${selected.size} технологий`);
              setSelected(new Set());
            }}
          >
            Следующий статус
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => {
              if (window.confirm(`Удалить ${selected.size} технологий?`)) {
                selected.forEach(id => deleteTechnology(id));
                showSnack(`Удалено ${selected.size} технологий`);
                setSelected(new Set());
              }
            }}
          >
            Удалить
          </Button>
          <IconButton 
            size="small" 
            onClick={() => setSelected(new Set())}
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      )}

      <QuickActions 
        markAllCompleted={markAllCompleted}
        resetAll={resetAll}
        randomNext={randomNext}
      />

      <Box mt={4}>
        {technologies.map(tech => (
          <MUITechCard
            key={tech.id}
            tech={tech}
            onStatusChange={() => updateStatus(tech.id)}
            onEdit={(t) => { setEditingTech(t); setFormOpen(true); }}
            onDelete={deleteTechnology}
            onSetDeadline={(t) => { setCurrentTech(t); setDeadlineOpen(true); }}
            onClearDeadline={(id) => {
              clearDeadline(id);
              showSnack('Сроки удалены');
            }}
            selected={selected}
            onToggleSelect={toggleSelect}
          />
        ))}
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16,
        }}
        onClick={() => { setEditingTech(null); setFormOpen(true); }}
      >
        <Add />
      </Fab>

      <TechnologyForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingTech(null); }}
        onSave={(data) => {
          editingTech ? updateTechnology({ ...editingTech, ...data }) : addTechnology(data);
          setEditingTech(null);
          showSnack(editingTech ? 'Изменено' : 'Добавлено');
        }}
        initialData={editingTech || {}}
      />

      <DeadlineForm
        open={deadlineOpen}
        onClose={() => setDeadlineOpen(false)}
        tech={currentTech}
        onSave={({ startDate, endDate }) => {
          updateTechnology({ ...currentTech, startDate, endDate });
          showSnack('Сроки сохранены');
        }}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snack.severity} 
          onClose={() => setSnack({ ...snack, open: false })}
          sx={{ 
            width: '100%',
            maxWidth: { xs: '90vw', sm: '400px', md: '500px' }
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
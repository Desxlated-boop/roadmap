import {
  Card, CardContent, Typography, Chip, IconButton, Menu, MenuItem,
  LinearProgress, Box, Checkbox, Button, Tooltip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Animations.css';

const statusConfig = {
  'not-started': { color: 'error', label: 'Не начато' },
  'in-progress': { color: 'warning', label: 'В процессе' },
  'completed': { color: 'success', label: 'Завершено' }
};

export default function MUITechCard({ 
  tech, 
  onStatusChange, 
  onEdit, 
  onDelete, 
  onSetDeadline, 
  onClearDeadline, 
  selected, 
  onToggleSelect 
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  // Вычисление оставшегося времени
  const getDeadlineInfo = () => {
    if (!tech.endDate) return null;
    
    const endDate = new Date(tech.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `Просрочено на ${Math.abs(diffDays)} дней`, color: 'error' };
    } else if (diffDays === 0) {
      return { text: 'Срок сегодня', color: 'warning' };
    } else if (diffDays <= 7) {
      return { text: `Осталось ${diffDays} дней`, color: 'warning' };
    } else {
      return { text: `Осталось ${diffDays} дней`, color: 'success' };
    }
  };

  const deadlineInfo = getDeadlineInfo();

  return (
    <Card sx={{ 
      mb: 2, 
      bgcolor: 'background.paper',
      border: deadlineInfo?.color === 'error' ? '1px solid #f44336' : 'none',
      animation: 'fadeIn 0.5s ease'
    }}
    className="tech-card-hover"
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Checkbox
            checked={selected?.has(tech.id) || false}
            onChange={() => onToggleSelect(tech.id)}
            size="small"
            sx={{ 
              p: 0.5,
              alignSelf: 'flex-start',
              mt: 0.5
            }}
            inputProps={{ 'aria-label': `Выбрать ${tech.title}` }}
          />
          
          <Box sx={{ 
            flex: 1, 
            minWidth: 0,
            mx: 1.5,
            alignSelf: 'flex-start'
          }}>
            <Box
              display="flex"
              alignItems="flex-start"
              gap={1}
              mb={1}
              sx={{ minHeight: '40px' }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  flex: 1,
                  lineHeight: 1.2,
                  alignSelf: 'center'
                }}
              >
                {tech.title}
              </Typography>

              {onSetDeadline && (
                <Tooltip title="Установить сроки">
                  <IconButton
                    size="small"
                    onClick={() => onSetDeadline(tech)}
                    aria-label={`Установить сроки для ${tech.title}`}
                    sx={{
                      alignSelf: 'flex-start',
                      mt: 0.5,
                      position: 'relative',
                      top: '4px'
                    }}
                  >
                    <CalendarTodayIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            
            <Typography variant="body2" color="text.secondary" paragraph>
              {tech.description}
            </Typography>
            
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Chip
                label={statusConfig[tech.status].label}
                color={statusConfig[tech.status].color}
                size="small"
                className="status-change"
              />
              
              {deadlineInfo && (
                <Chip
                  label={deadlineInfo.text}
                  color={deadlineInfo.color}
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
            
            {(tech.startDate || tech.endDate) && (
              <Box sx={{ mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {tech.startDate && (
                  <Typography variant="caption" color="text.secondary">
                    📅 Начало: {new Date(tech.startDate).toLocaleDateString('ru-RU')}
                  </Typography>
                )}
                {tech.endDate && (
                  <Typography variant="caption" color="text.secondary">
                    ✅ Окончание: {new Date(tech.endDate).toLocaleDateString('ru-RU')}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
          
          <IconButton 
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ 
              alignSelf: 'flex-start',
              mt: 0.5
            }}
            aria-label="Меню действий"
            aria-haspopup="true"
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        {tech.notes && (
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            📝 Заметки: {tech.notes.substring(0, 100)}{tech.notes.length > 100 ? '...' : ''}
          </Typography>
        )}
      </CardContent>

      <LinearProgress 
        variant="determinate" 
        value={tech.status === 'completed' ? 100 : tech.status === 'in-progress' ? 50 : 0} 
      />

      <Box display="flex" justifyContent="space-between" p={1}>
        <Link to={`/technology/${tech.id}`} style={{ textDecoration: 'none' }}>
          <Button 
            size="small"
            aria-label={`Подробнее о ${tech.title}`}
          >
            Подробно
          </Button>
        </Link>
        <Button 
          size="small" 
          onClick={onStatusChange}
          aria-label={`Изменить статус ${tech.title}`}
        >
          Следующий статус →
        </Button>
      </Box>

      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          onClick={() => { onEdit(tech); setAnchorEl(null); }}
          aria-label={`Редактировать ${tech.title}`}
        >
          Редактировать
        </MenuItem>
        <MenuItem 
          onClick={() => { 
            onSetDeadline && onSetDeadline(tech); 
            setAnchorEl(null); 
          }}
          aria-label={`Установить сроки для ${tech.title}`}
        >
          Установить сроки
        </MenuItem>
        {(tech.startDate || tech.endDate) && onClearDeadline && (
          <MenuItem 
            onClick={() => { 
              if (window.confirm(`Удалить сроки для "${tech.title}"?`)) {
                onClearDeadline(tech.id);
              }
              setAnchorEl(null); 
            }}
            aria-label={`Удалить сроки для ${tech.title}`}
            sx={{ color: 'warning.main' }}
          >
            Удалить сроки
          </MenuItem>
        )}
        <MenuItem 
          onClick={() => { onDelete(tech.id); setAnchorEl(null); }} 
          sx={{ color: 'error.main' }}
          aria-label={`Удалить ${tech.title}`}
        >
          Удалить
        </MenuItem>
      </Menu>
    </Card>
  );
}
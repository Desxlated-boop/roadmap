// src/components/DeadlineForm.jsx
import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Alert, Box, Typography
} from '@mui/material';

export default function DeadlineForm({ open, onClose, tech, onSave }) {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Инициализация формы
  useEffect(() => {
    if (open && tech) {
      setFormData({
        startDate: tech.startDate || '',
        endDate: tech.endDate || ''
      });
      setErrors({});
      setTouched({});
    }
  }, [open, tech]);

  // Валидация в реальном времени
  const validate = () => {
    const newErrors = {};

    // Проверка, что конец позже начала
    if (formData.startDate && formData.endDate && formData.endDate <= formData.startDate) {
      newErrors.endDate = 'Дата окончания должна быть позже даты начала';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Автовалидация при изменении
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validate();
    }
  }, [formData, touched]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setTouched({ ...touched, [field]: true });
  };

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ startDate: true, endDate: true });
    
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  if (!tech) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      aria-labelledby="deadline-form-title"
      aria-describedby="deadline-form-description"
      maxWidth="sm"
      fullWidth
      onKeyDown={handleKeyDown}
    >
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle 
          id="deadline-form-title"
          sx={{ pb: 1 }}
        >
          Установить сроки изучения
        </DialogTitle>
        
        <Box sx={{ px: 3, pb: 1 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            {tech.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            id="deadline-form-description"
          >
            Установите даты начала и окончания изучения технологии
          </Typography>
        </Box>

        <DialogContent>
          <TextField
            fullWidth
            type="date"
            label="Дата начала"
            value={formData.startDate}
            onChange={handleChange('startDate')}
            onBlur={handleBlur('startDate')}
            error={!!errors.startDate && touched.startDate}
            helperText={touched.startDate ? errors.startDate : ' '}
            margin="normal"
            InputLabelProps={{ 
              shrink: true,
              'aria-label': 'Дата начала изучения технологии'
            }}
            inputProps={{
              'aria-required': 'true',
              'aria-invalid': !!errors.startDate,
              'aria-describedby': errors.startDate ? 'start-date-error' : undefined
            }}
            required
          />

          <TextField
            fullWidth
            type="date"
            label="Дата окончания"
            value={formData.endDate}
            onChange={handleChange('endDate')}
            onBlur={handleBlur('endDate')}
            error={!!errors.endDate && touched.endDate}
            helperText={touched.endDate ? errors.endDate : ' '}
            margin="normal"
            InputLabelProps={{ 
              shrink: true,
              'aria-label': 'Дата окончания изучения технологии'
            }}
            inputProps={{
              'aria-required': 'true',
              'aria-invalid': !!errors.endDate,
              'aria-describedby': errors.endDate ? 'end-date-error' : undefined
            }}
            required
          />

          {errors.endDate && errors.endDate.includes('должна быть позже') && (
            <Alert 
              severity="warning" 
              sx={{ mt: 2 }}
              role="alert"
              aria-live="polite"
            >
              Дата окончания должна быть позже даты начала
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button 
            onClick={onClose}
            aria-label="Отменить установку сроков"
          >
            Отмена
          </Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={Object.keys(errors).length > 0}
            aria-label="Сохранить сроки изучения"
          >
            Сохранить сроки
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
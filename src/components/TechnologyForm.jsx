import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Alert
} from '@mui/material';

export default function TechnologyForm({ open, onClose, onSave, initialData = {} }) {
  const isEdit = Boolean(initialData.id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Название обязательно';
    else if (formData.title.trim().length < 3) newErrors.title = 'Минимум 3 символа';

    if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
    else if (formData.description.trim().length < 10) newErrors.description = 'Минимум 10 символов';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (open) {
      setFormData(isEdit ? { ...initialData } : { title: '', description: '' });
      setErrors({});
    }
  }, [open, initialData, isEdit]);

  const handleSubmit = () => {
    if (validate()) {
      onSave(isEdit ? { ...formData } : { ...formData, id: Date.now(), status: 'not-started', notes: '' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Редактировать технологию' : 'Новая технология'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Название технологии"
          fullWidth
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          error={!!errors.title}
          helperText={errors.title}
          required
          inputProps={{ 'aria-label': 'название технологии' }}
        />
        <TextField
          margin="dense"
          label="Описание"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          error={!!errors.description}
          helperText={errors.description || 'Минимум 10 символов'}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
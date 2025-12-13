import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};

      // Валидация имени
      if (!formData.name.trim()) {
        newErrors.name = 'Имя обязательно';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Минимум 2 символа';
      }

      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = 'Email обязателен';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Неверный формат email';
      }

      // Валидация сообщения
      if (!formData.message.trim()) {
        newErrors.message = 'Сообщение обязательно';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Минимум 10 символов';
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Данные формы:', formData);
      setIsSubmitted(true);
      
      // Сброс формы
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Форма обратной связи
      </Typography>
      
      {isSubmitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Форма успешно отправлена!
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Имя *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          
          <TextField
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          
          <TextField
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            placeholder="+7 (999) 999-99-99"
          />
          
          <TextField
            label="Сообщение *"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            multiline
            rows={4}
            fullWidth
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid}
            startIcon={<SendIcon />}
            sx={{ alignSelf: 'flex-start' }}
          >
            Отправить сообщение
          </Button>
          
          <Typography variant="caption" color="text.secondary">
            * — обязательные поля
          </Typography>
        </Box>
      </form>
    </Paper>
  );
}
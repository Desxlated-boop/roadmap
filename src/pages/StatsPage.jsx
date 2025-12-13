import { Container, Typography, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useTechnologies from '../hooks/useTechnologies.jsx';

export default function StatsPage() {
  const { technologies } = useTechnologies();
  
  // Подсчёт статистики
  const statusCounts = technologies.reduce((acc, tech) => {
    acc[tech.status] = (acc[tech.status] || 0) + 1;
    return acc;
  }, { 'not-started': 0, 'in-progress': 0, 'completed': 0 });
  
  const chartData = [
    { name: 'Не начато', value: statusCounts['not-started'], color: '#e53935' },
    { name: 'В процессе', value: statusCounts['in-progress'], color: '#00acc1' },
    { name: 'Завершено', value: statusCounts['completed'], color: '#16c60d' },
  ];
  
  const total = technologies.length;
  const completionRate = total > 0 ? Math.round((statusCounts['completed'] / total) * 100) : 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        📈 Статистика прогресса
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Общая статистика
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Всего технологий</Typography>
            <Typography variant="h3">{total}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Процент завершения</Typography>
            <Typography variant="h3" color="success.main">{completionRate}%</Typography>
          </Box>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Распределение по статусам
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Детальная статистика
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {chartData.map((item) => (
            <Box key={item.name} sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="h4" sx={{ color: item.color }}>{item.value}</Typography>
              <Typography variant="body2" color="text.secondary">{item.name}</Typography>
              <Typography variant="caption">
                {total > 0 ? Math.round((item.value / total) * 100) : 0}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
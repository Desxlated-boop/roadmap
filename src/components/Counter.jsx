import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Счётчик (useState пример)
      </Typography>
      <Typography variant="h3" gutterBottom>
        {count}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          onClick={() => setCount(c => c - 1)}
        >
          -1
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => setCount(0)}
        >
          Сбросить
        </Button>
        <Button 
          variant="contained" 
          onClick={() => setCount(c => c + 1)}
        >
          +1
        </Button>
      </Box>
    </Paper>
  );
}
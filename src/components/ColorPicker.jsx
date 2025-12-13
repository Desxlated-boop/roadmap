import { useState } from 'react';
import { Box, Typography, Paper, Button, ButtonGroup } from '@mui/material';

function ColorDisplay({ color }) {
  return (
    <Box
      sx={{
        backgroundColor: color,
        width: '100%',
        height: '100px',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        border: '2px solid #333',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Typography 
        sx={{ 
          color: '#fff', 
          textShadow: '1px 1px 2px #000',
          fontWeight: 'bold'
        }}
      >
        Выбранный цвет: {color}
      </Typography>
    </Box>
  );
}

function ColorControls({ color, onColorChange }) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Выберите цвет:
      </Typography>
      <ButtonGroup sx={{ flexWrap: 'wrap', gap: 1 }}>
        {colors.map((col) => (
          <Button
            key={col}
            onClick={() => onColorChange(col)}
            sx={{
              backgroundColor: col,
              minWidth: 60,
              height: 40,
              border: color === col ? '3px solid #000' : '1px solid #ccc',
              '&:hover': {
                backgroundColor: col,
                opacity: 0.9
              }
            }}
            aria-label={`Выбрать цвет ${col}`}
          />
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#ff0000');

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Выбор цвета (Lifting State Up пример)
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Состояние хранится в родительском компоненте и передаётся детям через props
      </Typography>
      
      <ColorDisplay color={selectedColor} />
      <ColorControls 
        color={selectedColor} 
        onColorChange={setSelectedColor} 
      />
    </Paper>
  );
}
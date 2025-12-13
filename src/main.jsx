import { StrictMode, useState, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#646cff',
    },
    secondary: {
      main: '#ff6b6b',
    },
    background: {
      default: mode === 'dark' ? '#0a0a0a' : '#f5f5f5',
      paper: mode === 'dark' ? '#1a1a1a' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#000000',
      secondary: mode === 'dark' ? '#aaaaaa' : '#555555',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function RootWithTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  const [mode, setMode] = useState(savedTheme)
  
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    localStorage.setItem('theme', newMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} themeMode={mode} />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootWithTheme />
  </StrictMode>
)
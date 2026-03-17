import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)

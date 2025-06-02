import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppState from './Context/AppState.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppState>
    <App />
  </AppState>
  </BrowserRouter>
  ,
)

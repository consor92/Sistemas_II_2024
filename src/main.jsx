import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

window.URL_BASE = 'http://localhost:3000/perfumes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

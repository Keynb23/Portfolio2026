import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BionicProvider } from './context/BionicContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BionicProvider>
      <App />
    </BionicProvider>
  </StrictMode>,
)
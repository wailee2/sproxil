import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LenisProvider } from "./LenisProvider";
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LenisProvider options={{ duration: 1.2, smoothWheel: true }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LenisProvider>
  </StrictMode>,
)

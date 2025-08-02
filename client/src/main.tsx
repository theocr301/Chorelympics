import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

//TODO: could define document.getElementById('root') as a const and then do if check to make sure it's defined
// const rootElement = document.getElementById('root');
// if (!rootElement) throw new Error("Root element not found");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

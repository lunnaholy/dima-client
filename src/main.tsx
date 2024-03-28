import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { App } from './app'
import { useNavigate } from 'react-router-dom'
import './index.css';
import './desktop.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider navigate={useNavigate}>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
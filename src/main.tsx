import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppProvider from './auth/useAuth.tsx'
// import { AuthProvider } from './auth/Auth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <BrowserRouter>

      <AppProvider >
        <App />
      </AppProvider>

    </BrowserRouter>


  </React.StrictMode>
)

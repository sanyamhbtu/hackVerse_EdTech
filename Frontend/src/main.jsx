import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import rootReducer from './Reducer/index.jsx';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const store=configureStore({
  reducer:rootReducer,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster toastOptions={{
    success: {
      style: {
        background: '#dcfce7',
        color: '#166534',
      },
    },
    loading: {
      style: {
        background: '#FEF9C3',       // Tailwind yellow-300
        color: '#B45309',            // Tailwind yellow-700
        border: '1px solid #FBBF24', // Tailwind yellow-400
        fontWeight: '600',           // Tailwind font-semibold
        padding: '7px',
        borderRadius: '7px',
      },
      iconTheme: {
        primary: '#FACC15',   // yellow-400
        secondary: '#FEF9C3', // yellow-100
      },
    },
    error: {
      style: {
        background: '#fee2e2',
        color: '#991b1b',
      },
    },
    style: {
      fontSize: '16px',
      fontFamily: 'Arial',
    },
  }}/>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)

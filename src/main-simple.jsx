import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Minimal version without Wagmi/RainbowKit to test if that's the issue
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

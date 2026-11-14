import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { initDemoApiInterceptor } from './services/apiAdapter';

// Initialize offline and GitHub Pages demo interceptor
initDemoApiInterceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

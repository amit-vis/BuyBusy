import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CustomItemContext from './contextData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomItemContext>
    <App />
  </CustomItemContext>
);

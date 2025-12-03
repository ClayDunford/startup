import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import { SucculentProvider } from './src/context/SucculentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SucculentProvider>
        <App />
    </SucculentProvider>
);
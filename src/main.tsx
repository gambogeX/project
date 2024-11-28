import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const fetchData = async () => {
    try {
        const response = await api.get('/your-endpoint');
        console.log('API Response:', response.data);
    } catch (error) {
        console.error('API Error:', error);
    }
};

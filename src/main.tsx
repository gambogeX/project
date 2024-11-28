import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    console.error('Root element not found');
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const fetchData = async () => {
    try {
        const response = await api.get('/your-endpoint');
        console.log('API Response:', response.data);
    } catch (error) {
        console.error('API Error:', error);
    }
};

fetchData();

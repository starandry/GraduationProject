import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './shared/ui/ErrorBoundary';

const baseUrl = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={baseUrl}>
        <StrictMode>
            <ErrorBoundary>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ErrorBoundary>
        </StrictMode>
    </BrowserRouter>
);

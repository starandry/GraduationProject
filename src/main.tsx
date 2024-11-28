import { StrictMode } from 'react'; //строгий режим
import { createRoot } from 'react-dom/client'; //корневой узел  для рендеринга приложения
import { Provider } from 'react-redux';
import { store } from './stores/store.ts';
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <Provider store={store}>
                    <App/>
            </Provider>
        </StrictMode>
    </BrowserRouter>
);

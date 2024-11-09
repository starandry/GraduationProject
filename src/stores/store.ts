import { configureStore } from '@reduxjs/toolkit';
/*import pathsReducer from './slices/pathSlice.ts';
import moviesReducer from './slices/moviesSlice';*/
import { moviesApi } from '../services/moviesApi';

/*export const store = configureStore({
    reducer: {
        paths: pathsReducer,
        movies: moviesReducer,
    },
});*/

export const store = configureStore({
    reducer: {
        // Подключаем редьюсер moviesApi с его reducerPath
        [moviesApi.reducerPath]: moviesApi.reducer,
    },
    // Добавляем middleware moviesApi для работы с кэшированием и автоматическими запросами
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
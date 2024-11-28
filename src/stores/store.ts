import { configureStore } from '@reduxjs/toolkit';
import pathsReducer from './slices/pathSlice.ts';
import moviesReducer from './slices/moviesSlice';
import favouritesReducer from './slices/favouritesSlice';
import themeReducer from './slices/themeSlice.ts';
import filtersReducer from './slices/filtersSlice.ts';
import hamburgerReducer from './slices/hamburgerSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        paths: pathsReducer,
        movies: moviesReducer,
        favourites: favouritesReducer,
        theme: themeReducer,
        filters: filtersReducer,
        hamburger: hamburgerReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
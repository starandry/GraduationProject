import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import favouritesReducer from './slices/favouritesSlice';
import themeReducer from './slices/themeSlice.ts';
import filtersReducer from './slices/filtersSlice.ts';
import hamburgerReducer from './slices/hamburgerSlice';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        favourites: favouritesReducer,
        theme: themeReducer,
        filters: filtersReducer,
        hamburger: hamburgerReducer,
        auth: authReducer,
        toast: toastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
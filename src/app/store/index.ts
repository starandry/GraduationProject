import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../features/movie-search/model/moviesSlice';
import favouritesReducer from '../../entities/movie/model/favouritesSlice';
import themeReducer from '../../entities/theme/model/themeSlice';
import filtersReducer from '../../features/movie-filter/model/filtersSlice';
import hamburgerReducer from '../../features/hamburger/model/hamburgerSlice';
import authReducer from '../../features/auth/model/authSlice';
import toastReducer from '../../entities/notification/model/toastSlice';
import { moviesApi } from '../../entities/movie/api/moviesApi';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        favourites: favouritesReducer,
        theme: themeReducer,
        filters: filtersReducer,
        hamburger: hamburgerReducer,
        auth: authReducer,
        toast: toastReducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

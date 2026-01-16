import { ReactElement } from 'react';
import { render, RenderOptions, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import moviesReducer from '../features/movie-search/model/moviesSlice';
import favouritesReducer from '../entities/movie/model/favouritesSlice';
import themeReducer from '../entities/theme/model/themeSlice';
import filtersReducer from '../features/movie-filter/model/filtersSlice';
import authReducer from '../features/auth/model/authSlice';
import toastReducer from '../entities/notification/model/toastSlice';
import { moviesApi } from '../entities/movie/api/moviesApi';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof setupStore>;
}

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      movies: moviesReducer,
      favourites: favouritesReducer,
      theme: themeReducer,
      filters: filtersReducer,
      auth: authReducer,
      toast: toastReducer,
      [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(moviesApi.middleware),
    preloadedState,
  });
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything from testing library
export { render, screen };
export { default as userEvent } from '@testing-library/user-event';

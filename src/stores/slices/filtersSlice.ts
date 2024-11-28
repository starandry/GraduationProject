import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {fetchMoviesByFilterAsync} from "./moviesSlice.ts";
import {RootState} from "../store.ts";

// Кастомный асинхронный экшен для того, чтобы жанры успевали в хранилище попадать
export const clearFilterAndFetchMovies = createAsyncThunk(
    'filters/clearFilterAndFetchMovies',
    async (btn: string, { dispatch, getState, rejectWithValue }) => {
        try {
            dispatch(clearFilterByValue(btn));

            const filters = (getState() as RootState).filters;

            await dispatch(fetchMoviesByFilterAsync({ filters })).unwrap();

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState: FiltersState = {
    movieName: '',
    genres: ['Adventure', 'Drama', 'Documental', 'Thriller'], // начальные жанры
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: '',
    country: '',
    sortBy: 'Rating',
    showButtons: false,
};

// Селектор для получения фильтров
export const selectFilters = (state: { filters: FiltersState }) => state.filters;

export const selectButtons = createSelector(
    [selectFilters],
    (filters) => {
        const genres = filters.genres.join(', ');
        const years = [filters.yearFrom, filters.yearTo].filter(Boolean).join(', ');
        return [genres, years].filter(Boolean).join(', ');
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<FiltersState>) {
            state.movieName = action.payload.movieName;
            state.genres = action.payload.genres;
            state.yearFrom = action.payload.yearFrom;
            state.yearTo = action.payload.yearTo;
            state.ratingFrom = action.payload.ratingFrom;
            state.ratingTo = action.payload.ratingTo;
            state.country = action.payload.country;
            state.sortBy = action.payload.sortBy;
            state.showButtons = action.payload.showButtons;
        },
        clearFilters(state) {
            // сброс фильтров до начальных значений
            state.movieName = '';
            state.genres = initialState.genres;
            state.yearFrom = '';
            state.yearTo = '';
            state.ratingFrom = '';
            state.ratingTo = '';
            state.country = '';
            state.sortBy = 'Rating';
            state.showButtons = false;
        },
        clearFilterByValue(state, action: PayloadAction<string>) {
            const valueToRemove = action.payload;
            //является ли значение частью массива genres
            if (state.genres.includes(valueToRemove)) {
                state.genres = state.genres.filter(genre => genre !== valueToRemove);
            }
            //является ли значение годом начала или конца
            else if (state.yearFrom === valueToRemove) {
                state.yearFrom = '';
            } else if (state.yearTo === valueToRemove) {
                state.yearTo = '';
            }
        },
    },
});

export const { setFilters, clearFilters, clearFilterByValue } = filtersSlice.actions;
export default filtersSlice.reducer;

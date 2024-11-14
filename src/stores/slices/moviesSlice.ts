import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, Movie, fetchHighRatedMovies, fetchMovieDetails } from '../../services/movieService.ts';

export const fetchMovieDetailsAsync = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (imdbID: string) => {
        return await fetchMovieDetails(imdbID);
    }
);

export const fetchMoviesAsync = createAsyncThunk(
    'movies/fetchMovies',
    async (page: number) => {
        return await fetchMovies(page);
    }
);

export const loadMoreMoviesAsync = createAsyncThunk(
    'movies/loadMoreMovies',
    async (page: number) => {
        return await fetchMovies(page);
    }
);

export const fetchHighRatedMoviesAsync = createAsyncThunk(
    'movies/fetchHighRatedMovies',
    async ({ page, minRating }: { page: number; minRating: number }) => {
        return await fetchHighRatedMovies(page, minRating);
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [] as Movie[],
        movieDetails: null as Movie | null,
        loading: false,
        error: null as string | null,
        page: 1,
    },
    reducers: {
        incrementPage(state) {
            state.page += 1;
        },
        clearMovieDetails(state) {
            state.movieDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = [...action.payload];
            })
            .addCase(fetchMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы';
            })
            .addCase(loadMoreMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMoreMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = [...state.movies, ...action.payload];
            })
            .addCase(loadMoreMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы';
            })
            .addCase(fetchHighRatedMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHighRatedMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = [...action.payload];
            })
            .addCase(fetchHighRatedMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы с высоким рейтингом';
            })
            .addCase(fetchMovieDetailsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.movieDetails = null;
            })
            .addCase(fetchMovieDetailsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movieDetails = action.payload;
            })
            .addCase(fetchMovieDetailsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить детали фильма';
            });
    },
});

export const { incrementPage, clearMovieDetails } = moviesSlice.actions;
export default moviesSlice.reducer;

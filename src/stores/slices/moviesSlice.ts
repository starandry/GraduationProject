import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMoviesByFilter, fetchHighRatedMovies, fetchMovieDetails, fetchRecommendedMovies, fetchMoviesBySearch } from '../../services/movieService.ts';
import { Movie } from '../../types'

export const fetchMovieDetailsAsync = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (imdbID: string) => {
        return await fetchMovieDetails(imdbID);
    }
);

export const fetchMoviesBySearchAsync = createAsyncThunk(
    'movies/fetchMoviesBySearch',
    async ({ query, page }: { query: string; page: number }) => {
        return await fetchMoviesBySearch(query, page);
    }
)

export const fetchMoviesAsync = createAsyncThunk(
    'movies/fetchMovies',
    async (page: number) => {
        return await fetchMovies(page);
    }
);

export const fetchMoviesByFilterAsync = createAsyncThunk(
    'movies/fetchMoviesByFilter',
    async ({ filters }: { filters: object }) => {
        return await fetchMoviesByFilter(filters);
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

export const fetchRecommendedMoviesAsync = createAsyncThunk(
    'movies/fetchRecommendedMovies',
    async (genres: string[]) => {
        return await fetchRecommendedMovies(genres);
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
        recommendedMovies: [] as Movie[],
        search: false,
    },
    reducers: {
        incrementPage(state) {
            state.page += 1;
        },
        clearMovieDetails(state) {
            state.movieDetails = null;
        },
        setSearchTrue(state) {
            state.search = true;
        },
        setSearchFalse(state) {
            state.search = false;
        }
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
            .addCase(fetchMoviesByFilterAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByFilterAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = [...action.payload];
            })
            .addCase(fetchMoviesByFilterAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы с высоким рейтингом';
            })
            .addCase(loadMoreMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMoreMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                const merged = [...state.movies, ...action.payload];
                const uniqueById = merged.filter(
                    (movie, index, array) =>
                        array.findIndex((item) => item.imdbID === movie.imdbID) === index
                );
                state.movies = uniqueById;
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
            })
            .addCase(fetchRecommendedMoviesAsync.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
            .addCase(fetchRecommendedMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendedMovies = action.payload;
            })
            .addCase(fetchRecommendedMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить рекомендации';
            })
            .addCase(fetchMoviesBySearchAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesBySearchAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = [...action.payload]; // Замена тек фильмов результатами поиска
            })
            .addCase(fetchMoviesBySearchAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось найти фильмы';
            });
    },
});

export const { incrementPage, clearMovieDetails, setSearchTrue, setSearchFalse } = moviesSlice.actions;
export default moviesSlice.reducer;

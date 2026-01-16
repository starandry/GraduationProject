import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    fetchMovies,
    fetchMoviesByFilter,
    fetchHighRatedMovies,
    fetchMovieDetails,
    fetchRecommendedMovies,
    fetchMoviesBySearch,
} from './movieService';
import { FilterOptions, Movie, MovieDetails } from '../model/types';

type QueryError = {
    status: string;
    error: string;
};

const toQueryError = (error: unknown): QueryError => {
    if (error instanceof Error) {
        return { status: 'CUSTOM_ERROR', error: error.message };
    }

    return { status: 'CUSTOM_ERROR', error: 'Unknown error' };
};

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fakeBaseQuery<QueryError>(),
    endpoints: (builder) => ({
        fetchMovies: builder.query<Movie[], number>({
            queryFn: async (page) => {
                try {
                    const data = await fetchMovies(page);
                    return { data };
                } catch (error) {
                    return { error: toQueryError(error) };
                }
            },
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems) => {
                const merged = [...currentCache, ...newItems];
                const uniqueById = merged.filter(
                    (movie, index, array) =>
                        array.findIndex((item) => item.imdbID === movie.imdbID) === index
                );
                currentCache.splice(0, currentCache.length, ...uniqueById);
            },
            forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
        }),
        fetchMoviesByFilter: builder.query<Movie[], FilterOptions>({
            queryFn: async (filters) => {
                try {
                    const data = await fetchMoviesByFilter(filters);
                    return { data };
                } catch (error) {
                    return { error: toQueryError(error) };
                }
            },
        }),
        fetchHighRatedMovies: builder.query<Movie[], { page: number; minRating: number }>({
            queryFn: async ({ page, minRating }) => {
                try {
                    const data = await fetchHighRatedMovies(page, minRating);
                    return { data };
                } catch (error) {
                    return { error: toQueryError(error) };
                }
            },
        }),
        fetchMovieDetails: builder.query<MovieDetails, string>({
            queryFn: async (imdbID) => {
                try {
                    const data = await fetchMovieDetails(imdbID);
                    return { data };
                } catch (error) {
                    return { error: toQueryError(error) };
                }
            },
        }),
        fetchRecommendedMovies: builder.query<Movie[], string[]>({
            queryFn: async (genres) => {
                try {
                    const data = await fetchRecommendedMovies(genres);
                    return { data };
                } catch (error) {
                    return { error: toQueryError(error) };
                }
            },
        }),
        fetchMoviesBySearch: builder.query<Movie[], { query: string; page?: number }>({
            queryFn: async ({ query, page = 1 }) => {
                try {
                    const primaryPage = page;
                    const secondaryPage = page + 1;
                    const [primary, secondary] = await Promise.all([
                        fetchMoviesBySearch(query, primaryPage),
                        fetchMoviesBySearch(query, secondaryPage),
                    ]);
                    const merged = [...primary, ...secondary];
                    const uniqueById = merged.filter(
                        (movie, index, array) =>
                            array.findIndex((item) => item.imdbID === movie.imdbID) === index
                    );
                    return { data: uniqueById.slice(0, 32) };
                } catch (error) {
                    return { error: toQueryError(error) };
                }
            },
        }),
    }),
});

export const {
    useFetchMoviesQuery,
    useFetchMoviesByFilterQuery,
    useFetchHighRatedMoviesQuery,
    useFetchMovieDetailsQuery,
    useFetchRecommendedMoviesQuery,
    useFetchMoviesBySearchQuery,
} = moviesApi;

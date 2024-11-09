import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_URL} from '../constants/APIconstats.ts';

export type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
};
console.log(API_URL);
export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        fetchMovies: builder.query<Movie[], number>({
            query: (page) => `&s=all&type=movie&page=${page}`,
        }),
    }),
});

// Экспортируем хуки, которые автоматически генерируются для каждого эндпоинта
export const { useFetchMoviesQuery } = moviesApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/APIconstats.ts';

export type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
};

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        fetchMovies: builder.query<Movie[], number>({
            query: (page) => `&s=all&type=movie&page=${page}`,
            onQueryStarted: async (arg, { queryFulfilled }) => {
                const url = `${API_URL}&s=all&type=movie&page=${arg}`;
                console.log("Fetching URL:", url);
                try {
                    const response = await queryFulfilled;
                    console.log("Response:", response);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            },
        }),
    }),
});

export const { useFetchMoviesQuery } = moviesApi;


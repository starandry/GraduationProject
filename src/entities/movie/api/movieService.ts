import axios from 'axios';
import { API_URL } from '../../../shared/config/api';
import { FilterOptions, Movie, MovieDetails } from '../model/types';
import { movieCache } from '../lib/apiCache';

/**
 * Helper to fetch with cache
 */
const fetchWithCache = async <T>(cacheKey: string, fetcher: () => Promise<T>): Promise<T> => {
    const cached = movieCache.get<T>(cacheKey);
    if (cached) return cached;

    const data = await fetcher();
    movieCache.set(cacheKey, data);
    return data;
};

/**
 * Fetch movie details with caching
 */
const fetchMovieDetailsWithCache = async (imdbID: string): Promise<MovieDetails> => {
    return fetchWithCache(`movie_${imdbID}`, async () => {
        const response = await axios.get(`${API_URL}&i=${imdbID}`);
        if (response.data.Response === 'True') return response.data as MovieDetails;
        throw new Error(response.data.Error);
    });
};

/**
 * Fetch movies from multiple pages and get their details
 */
const fetchMoviesWithDetails = async (searchUrl: string, pages: number): Promise<Movie[]> => {
    const movies: { imdbID: string }[] = [];

    for (let page = 1; page <= pages; page++) {
        const response = await axios.get(`${searchUrl}&page=${page}`);
        if (response.data.Response === 'True' && response.data.Search) {
            movies.push(...response.data.Search);
        } else {
            break;
        }
    }

    return Promise.all(movies.map(m => fetchMovieDetailsWithCache(m.imdbID)));
};

export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
    return fetchWithCache(`movies_page_${page}`, async () => {
        const response = await axios.get(`${API_URL}&s=all&type=movie&y=2020&page=${page}`);
        if (response.data.Response !== 'True') throw new Error(response.data.Error);
        return Promise.all(
            response.data.Search.map((m: { imdbID: string }) => fetchMovieDetailsWithCache(m.imdbID))
        );
    });
};

export const fetchMoviesByFilter = async (filters: FilterOptions): Promise<Movie[]> => {
    const year = filters.yearFrom || filters.yearTo || '';
    const title = filters.movieName || 'all';
    const cacheKey = `filter_${title}_${year}_${filters.genres.join(',')}_${filters.ratingFrom}_${filters.ratingTo}_${filters.country}_${filters.sortBy}`;

    return fetchWithCache(cacheKey, async () => {
        const detailedMovies = await fetchMoviesWithDetails(`${API_URL}&s=${title}&type=movie&y=${year}`, 3);

        const filterGenres = filters.genres.map(g => g.toLowerCase());
        const ratingFrom = parseFloat(String(filters.ratingFrom));
        const ratingTo = parseFloat(String(filters.ratingTo));

        return detailedMovies
            // Filter by genre
            .filter(movie => {
                const movieGenres = movie.Genre.split(', ').map(g => g.trim().toLowerCase());
                return filterGenres.some(fg => movieGenres.includes(fg));
            })
            // Filter by rating
            .filter(movie => {
                const rating = parseFloat(movie.imdbRating);
                if (isNaN(rating)) return false;
                if (ratingFrom && ratingTo) return rating >= ratingFrom && rating <= ratingTo;
                if (ratingFrom) return rating >= ratingFrom;
                if (ratingTo) return rating <= ratingTo;
                return true;
            })
            // Filter by country
            .filter(movie => {
                if (!filters.country) return true;
                const movieCountries = movie.Country.split(', ').map(c => c.trim().toLowerCase());
                const filterCountry = filters.country.toLowerCase();
                return movieCountries.includes(filterCountry);
            })
            // Sort
            .sort((a, b) => {
                if (filters.sortBy === 'Rating') return (parseFloat(a.imdbRating) || 0) - (parseFloat(b.imdbRating) || 0);
                if (filters.sortBy === 'Year') return (parseInt(a.Year, 10) || 0) - (parseInt(b.Year, 10) || 0);
                return 0;
            });
    });
};

export const fetchHighRatedMovies = async (page: number, minRating: number): Promise<Movie[]> => {
    const movies = await fetchMovies(page);
    return movies.filter((movie) => {
        const rating = parseFloat(movie.imdbRating);
        return rating >= minRating;
    });
};

export const fetchMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
    return fetchMovieDetailsWithCache(imdbID);
};

export const fetchRecommendedMovies = async (genres: string[]): Promise<Movie[]> => {
    return fetchWithCache(`recommended_${genres.join('_')}`, async () => {
        const detailedMovies = await fetchMoviesWithDetails(`${API_URL}&s=${genres[0]}&type=movie`, 2);

        return detailedMovies.filter(movie => {
            const movieGenres = movie.Genre.split(',').map(g => g.trim());
            return genres.filter(g => movieGenres.includes(g)).length >= 2;
        });
    });
};

export const fetchMoviesBySearch = async (query: string, page: number = 1): Promise<Movie[]> => {
    if (!query) throw new Error('Search query cannot be empty');

    return fetchWithCache(`search_${query}_${page}`, async () => {
        const response = await axios.get(`${API_URL}&s=${encodeURIComponent(query)}&type=movie&page=${page}`);
        if (response.data.Response !== 'True') throw new Error(response.data.Error || 'No movies found');
        return Promise.all(
            response.data.Search.map((m: { imdbID: string }) => fetchMovieDetailsWithCache(m.imdbID))
        );
    });
};

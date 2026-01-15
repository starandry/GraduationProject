import axios from 'axios';
import { API_URL } from '../constants/APIconstats.ts';
import { FilterOptions, Movie, MovieDetails } from '../types';
import { movieCache } from '../utils/apiCache';

/**
 * Fetch movie details with caching to reduce API calls
 */
const fetchMovieDetailsWithCache = async (imdbID: string): Promise<MovieDetails> => {
    const cacheKey = `movie_${imdbID}`;
    const cached = movieCache.get<MovieDetails>(cacheKey);

    if (cached) {
        return cached;
    }

    const response = await axios.get(`${API_URL}&i=${imdbID}`);
    if (response.data.Response === 'True') {
        movieCache.set(cacheKey, response.data);
        return response.data as MovieDetails;
    }
    throw new Error(response.data.Error);
};

export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
    const cacheKey = `movies_page_${page}`;
    const cached = movieCache.get<Movie[]>(cacheKey);

    if (cached) {
        return cached;
    }

    const response = await axios.get(`${API_URL}&s=all&type=movie&y=2020&page=${page}`);

    if (response.data.Response === 'True') {
        const movieDetailsPromises = response.data.Search.map((movie: { imdbID: string }) =>
            fetchMovieDetailsWithCache(movie.imdbID)
        );

        const movies = await Promise.all(movieDetailsPromises);
        movieCache.set(cacheKey, movies);
        return movies;
    } else {
        throw new Error(response.data.Error);
    }
};

export const fetchMoviesByFilter = async (filters: FilterOptions): Promise<Movie[]> => {
    const year = filters.yearFrom || filters.yearTo || '';
    const title = filters.movieName || 'all';

    // Create cache key from filters
    const cacheKey = `filter_${title}_${year}_${filters.genres.join(',')}_${filters.ratingFrom}_${filters.ratingTo}_${filters.country}_${filters.sortBy}`;
    const cached = movieCache.get<Movie[]>(cacheKey);

    if (cached) {
        return cached;
    }

    const movies: { imdbID: string }[] = [];

    try {
        // Reduce from 5 to 3 pages to minimize API calls
        for (let i = 1; i <= 3; i++) {
            const response = await axios.get(`${API_URL}&s=${title}&type=movie&y=${year}&page=${i}`);
            if (response.data.Search) {
                movies.push(...response.data.Search);
            } else {
                break;
            }
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }

    // Use cached movie details
    const detailedMoviesPromises = movies.map((movie) =>
        fetchMovieDetailsWithCache(movie.imdbID)
    );

    const detailedMovies = await Promise.all(detailedMoviesPromises);

    // Преобразование detailedMovies в массив с учетом фильтров
    const filteredMovies = detailedMovies.filter((movie) => {
        const movieGenres = movie.Genre.split(', ').map((genre) => genre.trim().toLowerCase());
        const filterGenres = filters.genres.map((genre) => genre.toLowerCase());
        return filterGenres.some((filterGenre) => movieGenres.includes(filterGenre));
    });

    // Фильтрация по рейтингу imdbRating
    const ratingFrom = parseFloat(String(filters.ratingFrom));
    const ratingTo = parseFloat(String(filters.ratingTo));

    const moviesByRating = filteredMovies.filter((movie) => {
        const movieRating = parseFloat(movie.imdbRating);

        if (isNaN(movieRating)) return false; // Исключить фильмы с некорректным рейтингом

        if (ratingFrom && ratingTo) {
            return movieRating >= ratingFrom && movieRating <= ratingTo;
        } else if (ratingFrom) {
            return movieRating >= ratingFrom;
        } else if (ratingTo) {
            return movieRating <= ratingTo;
        }
        return true; // Если ни одно значение не указано, вернуть все фильмы
    });

    // Фильтрация по стране
    const moviesByCountry =
        filters.country && filters.country.length > 0
            ? moviesByRating.filter((movie) => {
                  const movieCountries = movie.Country.split(', ').map((country) => country.trim().toLowerCase());
                  const filterCountries = Array.isArray(filters.country)
                      ? filters.country.map((country) => country.toLowerCase())
                      : [filters.country.toLowerCase()];
                  return filterCountries.some((filterCountry) => movieCountries.includes(filterCountry));
              })
            : moviesByRating; // Если страна не указана, вернуть все фильмы из moviesByRating

    // Сортировка по рейтингу или году
    const sortedMovies = moviesByCountry.sort((a, b) => {
        if (filters.sortBy === 'Rating') {
            const ratingA = parseFloat(a.imdbRating) || 0;
            const ratingB = parseFloat(b.imdbRating) || 0;
            return ratingA - ratingB;
        } else if (filters.sortBy === 'Year') {
            const yearA = parseInt(a.Year, 10) || 0;
            const yearB = parseInt(b.Year, 10) || 0;
            return yearA - yearB;
        }
        return 0;
    });

    // Cache the filtered and sorted results
    movieCache.set(cacheKey, sortedMovies);
    return sortedMovies;
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
    const cacheKey = `recommended_${genres.join('_')}`;
    const cached = movieCache.get<Movie[]>(cacheKey);

    if (cached) {
        return cached;
    }

    const genre = genres[0]; // первый жанр для запроса
    const movies: { imdbID: string }[] = [];

    // до 20 фильмов (2 страницы по 10 фильмов)
    for (let page = 1; page <= 2; page++) {
        const response = await axios.get(`${API_URL}&s=${genre}&type=movie&page=${page}`);
        if (response.data.Response === 'True') {
            movies.push(...response.data.Search);
        } else {
            break;
        }
    }

    // Use cached movie details
    const detailedMoviesPromises = movies.map((movie) =>
        fetchMovieDetailsWithCache(movie.imdbID)
    );

    const detailedMovies = await Promise.all(detailedMoviesPromises);

    // фильмы, у которых хотя бы два жанра совпадают
    const recommended = detailedMovies.filter((movie: Movie) => {
        const movieGenres = movie.Genre.split(',').map((genre) => genre.trim());
        const matchingGenres = genres.filter((genre) => movieGenres.includes(genre));
        return matchingGenres.length >= 2;
    });

    movieCache.set(cacheKey, recommended);
    return recommended;
};

export const fetchMoviesBySearch = async (query: string, page: number = 1): Promise<Movie[]> => {
    if (!query) {
        throw new Error('Search query cannot be empty');
    }

    const cacheKey = `search_${query}_${page}`;
    const cached = movieCache.get<Movie[]>(cacheKey);

    if (cached) {
        return cached;
    }

    const response = await axios.get(`${API_URL}&s=${encodeURIComponent(query)}&type=movie&page=${page}`);

    if (response.data.Response === 'True') {
        const movieDetailsPromises = response.data.Search.map((movie: { imdbID: string }) =>
            fetchMovieDetailsWithCache(movie.imdbID)
        );

        const movies = await Promise.all(movieDetailsPromises);
        movieCache.set(cacheKey, movies);
        return movies;
    } else {
        throw new Error(response.data.Error || 'No movies found');
    }
};

import axios from 'axios';
import { API_URL } from '../constants/APIconstats.ts';
import { FilterOptions, Movie } from '../types';

export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
    const response = await axios.get(`${API_URL}&s=all&type=movie&y=2020&page=${page}`);

    if (response.data.Response === 'True') {
        const movieDetailsPromises = response.data.Search.map(async (movie: { imdbID: string }) => {
            const detailsResponse = await axios.get(`${API_URL}&i=${movie.imdbID}`);
            /*console.log(detailsResponse.data);*/
            return detailsResponse.data;
        });

        return await Promise.all(movieDetailsPromises);
    } else {
        throw new Error(response.data.Error);
    }
};

export const fetchMoviesByFilter = async (filters: FilterOptions): Promise<Movie[]> => {
    const year = filters.yearFrom || filters.yearTo || '';
    const title = filters.movieName || 'all';
    const movies: Movie[] = [];

    try {
        for (let i = 1; i <= 5; i++) {
            // Цикл для трёх страниц
            const response = await axios.get(`${API_URL}&s=${title}&type=movie&y=${year}&page=${i}`);
            if (response.data.Search) {
                movies.push(...response.data.Search); // Добавляем фильмы в массив
            } else {
                console.warn(`Нет данных на странице ${i}`);
                break;
            }
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }

    const detailedMoviesPromises = movies.map(async (movie: { imdbID: string }) => {
        const detailsResponse = await axios.get(`${API_URL}&i=${movie.imdbID}`);
        return detailsResponse.data;
    });

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
    return moviesByCountry.sort((a, b) => {
        if (filters.sortBy === 'Rating') {
            const ratingA = parseFloat(a.imdbRating) || 0;
            const ratingB = parseFloat(b.imdbRating) || 0;
            return ratingA - ratingB;
        } else if (filters.sortBy === 'Year') {
            const yearA = parseInt(a.Year, 10) || 0;
            const yearB = parseInt(b.Year, 10) || 0;
            return yearA - yearB;
        }
        return 0; // , если `sortBy` не указан
    });


};

export const fetchHighRatedMovies = async (page: number, minRating: number): Promise<Movie[]> => {
    const movies = await fetchMovies(page);
    return movies.filter((movie) => {
        const rating = parseFloat(movie.imdbRating);
        return rating >= minRating;
    });
};

export const fetchMovieDetails = async (imdbID: string): Promise<Movie> => {
    const response = await axios.get(`${API_URL}&i=${imdbID}`);

    if (response.data.Response === 'True') {
        return response.data;
    } else {
        throw new Error(response.data.Error);
    }
};

export const fetchRecommendedMovies = async (genres: string[]): Promise<Movie[]> => {
    const genre = genres[0]; // первый жанр для запроса
    const movies: { imdbID: string }[] = [];

    // до 20 фильмов (2 страницs по 10 фильмов)
    for (let page = 1; page <= 2; page++) {
        const response = await axios.get(`${API_URL}&s=${genre}&type=movie&page=${page}`);
        if (response.data.Response === 'True') {
            movies.push(...response.data.Search);
        } else {
            break;
        }
    }

    // детали для каждого фильма, чтобы узнать жанры
    const detailedMoviesPromises = movies.map(async (movie: { imdbID: string }) => {
        const detailsResponse = await axios.get(`${API_URL}&i=${movie.imdbID}`);
        return detailsResponse.data;
    });

    const detailedMovies = await Promise.all(detailedMoviesPromises);

    //фильмы, у которых хотя бы два жанра совпадают
    return detailedMovies.filter((movie: Movie) => {
        // жанры кот  есть  у найденного фильма
        const movieGenres = movie.Genre.split(',').map((genre) => genre.trim());
        //жанры кот  совпадают  с исходным фильмом
        const matchingGenres = genres.filter((genre) => movieGenres.includes(genre));
        return matchingGenres.length >= 2;
    });
};

export const fetchMoviesBySearch = async (query: string, page: number = 1): Promise<Movie[]> => {
    if (!query) {
        throw new Error('Search query cannot be empty');
    }

    const response = await axios.get(`${API_URL}&s=${encodeURIComponent(query)}&type=movie&page=${page}`);

    if (response.data.Response === 'True') {
        const movieDetailsPromises = response.data.Search.map(async (movie: { imdbID: string }) => {
            const detailsResponse = await axios.get(`${API_URL}&i=${movie.imdbID}`);
            return detailsResponse.data;
        });

        return await Promise.all(movieDetailsPromises);
    } else {
        throw new Error(response.data.Error || 'No movies found');
    }
};
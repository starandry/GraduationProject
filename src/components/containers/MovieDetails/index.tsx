import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './movieDetails.module.scss';
import { MovieDetails as MovieDetailsType } from '../../../types';
import { MoviePoster } from './MoviePoster';
import { MovieHeader } from './MovieHeader';
import { MovieInfo } from './MovieInfo';
import { RecommendedMovies } from './RecommendedMovies';
import { MovieDetailsSkeleton } from '../../UI/Skeleton';
import { ErrorMessage } from '../../UI/ErrorMessage';
import { useMovieActions } from '../../../hooks/useMovieActions';
import {
    useFetchMovieDetailsQuery,
    useFetchRecommendedMoviesQuery,
} from '../../../services/moviesApi';
import { skipToken } from '@reduxjs/toolkit/query';

const MovieDetails: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();

    const {
        data: movieDetails,
        isLoading,
        error,
    } = useFetchMovieDetailsQuery(imdbID ?? skipToken);

    const genres = useMemo(() => {
        if (!movieDetails?.Genre) return [];
        return movieDetails.Genre.split(',').map((genre) => genre.trim());
    }, [movieDetails]);

    const { data: recommendedMovies = [] } = useFetchRecommendedMoviesQuery(genres, {
        skip: genres.length === 0,
    });

    // Use custom hook for movie actions
    const { isFavourite, handleFavouriteClick, handleShareClick } = useMovieActions(
        movieDetails as MovieDetailsType | null
    );

    if (isLoading) return <MovieDetailsSkeleton />;
    if (error) {
        const message = typeof error === 'object' && error !== null && 'error' in error
            ? String(error.error)
            : 'Не удалось загрузить детали фильма';
        return <ErrorMessage message={message} />;
    }
    if (!movieDetails) return null;

    return (
        <div className={styles.wrappMovieDetails}>
            <div className={styles.movieDetails}>
                <div className={styles.container}>
                    <MoviePoster
                        movie={movieDetails}
                        isFavourite={isFavourite}
                        onFavouriteClick={handleFavouriteClick}
                        onShareClick={handleShareClick}
                    />
                    <MovieHeader movie={movieDetails} />
                    <MovieInfo movie={movieDetails} />
                </div>
            </div>
            <RecommendedMovies movies={recommendedMovies} />
        </div>
    );
};

export { MovieDetails };

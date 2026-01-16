import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './movieDetails.module.scss';
import { MovieDetails as MovieDetailsType } from '../../entities/movie/model/types';
import { MoviePoster } from '../../entities/movie/ui/MoviePoster';
import { MovieHeader } from '../../entities/movie/ui/MovieHeader';
import { MovieInfo } from '../../entities/movie/ui/MovieInfo';
import { RecommendedMovies } from './RecommendedMovies';
import { MovieDetailsSkeleton } from '../../shared/ui/Skeleton';
import { ErrorMessage } from '../../shared/ui/ErrorMessage';
import { useMovieActions } from '../../features/movie-actions/lib/useMovieActions';
import {
    useFetchMovieDetailsQuery,
    useFetchRecommendedMoviesQuery,
} from '../../entities/movie/api/moviesApi';
import { skipToken } from '@reduxjs/toolkit/query';

const MovieDetailsPage: React.FC = () => {
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
        const message = 'error' in error
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

export { MovieDetailsPage };

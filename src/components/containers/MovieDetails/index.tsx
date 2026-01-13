import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetailsAsync, clearMovieDetails, fetchRecommendedMoviesAsync } from '../../../stores/slices/moviesSlice.ts';
import { RootState, AppDispatch } from '../../../stores/store.ts';
import styles from './movieDetails.module.scss';
import { MovieDetails as MovieDetailsType, Movie } from '../../../types';
import { MoviePoster } from './MoviePoster';
import { MovieHeader } from './MovieHeader';
import { MovieInfo } from './MovieInfo';
import { RecommendedMovies } from './RecommendedMovies';
import { MovieDetailsSkeleton } from '../../UI/Skeleton';
import { ErrorMessage } from '../../UI/ErrorMessage';
import { useMovieActions } from '../../../hooks/useMovieActions';

const MovieDetails: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const movieDetails = useSelector((state: RootState) => state.movies.movieDetails as MovieDetailsType);
    const recommendedMovies = useSelector((state: RootState) => state.movies.recommendedMovies as Movie[]);
    const loading = useSelector((state: RootState) => state.movies.loading);
    const error = useSelector((state: RootState) => state.movies.error);

    // Use custom hook for movie actions
    const { isFavourite, handleFavouriteClick, handleShareClick } = useMovieActions(movieDetails);

    useEffect(() => {
        if (imdbID) {
            dispatch(fetchMovieDetailsAsync(imdbID));
        }

        return () => {
            dispatch(clearMovieDetails());
        };
    }, [dispatch, imdbID]);

    useEffect(() => {
        if (movieDetails) {
            const genres = movieDetails.Genre.split(',').map(genre => genre.trim());
            dispatch(fetchRecommendedMoviesAsync(genres));
        }
    }, [dispatch, movieDetails]);

    if (loading) return <MovieDetailsSkeleton />;
    if (error) return <ErrorMessage message={error} />;
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

export {MovieDetails};
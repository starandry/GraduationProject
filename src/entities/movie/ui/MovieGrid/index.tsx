import React from 'react';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../model/types';
import styles from './movieGrid.module.scss';

interface MovieGridProps {
    movies: Movie[];
    className?: string;
}

/**
 * MovieGrid - displays movies in a responsive grid layout
 */
export const MovieGrid: React.FC<MovieGridProps> = ({ movies, className = '' }) => {
    if (!movies || movies.length === 0) return null;

    return (
        <div className={`${styles.movieGrid} ${className}`}>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

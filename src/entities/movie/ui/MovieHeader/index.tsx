import React from 'react';
import { MovieDetails } from '../../model/types';
import { IMDbBadge } from '../../../../shared/ui/Icon/icon.component';
import { useThemeStyles } from '../../../theme/lib/useThemeStyles';
import styles from './movieHeader.module.scss';

interface MovieHeaderProps {
    movie: MovieDetails;
}

export const MovieHeader: React.FC<MovieHeaderProps> = React.memo(({ movie }) => {
    const getThemeClass = useThemeStyles(styles);

    const genres = movie.Genre.split(',').map(genre => genre.trim()).join(' • ');

    return (
        <div className={styles.movieHeader}>
            <p className={styles.genre}>{genres}</p>
            <h2 className={getThemeClass('title')}>{movie.Title}</h2>
            <div className={styles.infoBadges}>
                <span className={styles.rating}>
                    <span>{movie.imdbRating}</span>
                </span>
                <div className={styles.IMDWrap}>
                    <IMDbBadge />
                    <span>{movie.imdbRating}</span>
                </div>
                <div className={styles.runtimeWrap}>
                    <span>{movie.Runtime}</span>
                </div>
            </div>
        </div>
    );
});

MovieHeader.displayName = 'MovieHeader';

import React from 'react';
import { MovieDetails } from '../../../../types';
import { FavouriteIcon, ShareIcon } from '../../../UI/Icon/icon.component';
import { Spacer } from '../../../UI/Spacer';
import { useThemeStyles } from '../../../../hooks/useThemeStyles';
import styles from './moviePoster.module.scss';

interface MoviePosterProps {
    movie: MovieDetails;
    isFavourite: boolean;
    onFavouriteClick: () => void;
    onShareClick: () => void;
}

export const MoviePoster: React.FC<MoviePosterProps> = React.memo(({
    movie,
    isFavourite,
    onFavouriteClick,
    onShareClick
}) => {
    const getThemeClass = useThemeStyles(styles);

    return (
        <div className={styles.wrappPoster}>
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
                className={styles.poster}
            />
            <div className={getThemeClass('iconPanel')}>
                <span className={styles.wrapFavourite} onClick={onFavouriteClick}>
                    <FavouriteIcon isActive={isFavourite} />
                </span>
                <Spacer className={styles.divider} />
                <span className={styles.wrapShare} onClick={onShareClick}>
                    <ShareIcon />
                </span>
            </div>
        </div>
    );
});

MoviePoster.displayName = 'MoviePoster';

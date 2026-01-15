import React, { useEffect, useState } from 'react';
import { MovieDetails } from '../../../../types';
import { FavouriteIcon, PosterPlaceholderIcon, ShareIcon } from '../../../UI/Icon/icon.component';
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
    const [posterLoadError, setPosterLoadError] = useState(false);
    const posterUrl = movie.Poster.trim();
    const hasPosterUrl = posterUrl !== '' && posterUrl !== 'N/A';
    const usePosterPlaceholder = !hasPosterUrl || posterLoadError;

    useEffect(() => {
        setPosterLoadError(false);
    }, [movie.Poster, movie.imdbID]);

    return (
        <div className={styles.wrappPoster}>
            {usePosterPlaceholder ? (
                <div className={getThemeClass('posterPlaceholder')}>
                    <PosterPlaceholderIcon className={styles.placeholderIcon} />
                    <span className={styles.placeholderLabel}>Постер недоступен</span>
                </div>
            ) : (
                <img
                    src={posterUrl}
                    alt={movie.Title}
                    className={styles.poster}
                    onError={() => setPosterLoadError(true)}
                />
            )}
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

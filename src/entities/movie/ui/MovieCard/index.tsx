import React, { useEffect, useState } from 'react';
import styles from './movieCard.module.scss';
import { useLocation, Link } from "react-router-dom";
import { FavouriteIcon, FireIcon, PosterPlaceholderIcon } from "../../../../shared/ui/Icon/icon.component";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../../model/favouritesSlice";
import { Movie } from '../../model/types';
import { useThemeStyles } from '../../../theme/lib/useThemeStyles';
import { LazyImage } from '../../../../shared/ui/LazyImage';
import { cn } from '../../../../shared/lib/cn';

type FavouritesState = {
    favourites: Movie[];
};

type MovieCardProps = {
    movie: Movie;
    divClassName?: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, divClassName }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const rating = parseFloat(movie.imdbRating);
    const currentPath = location.pathname;
    const getThemeClass = useThemeStyles(styles);
    const [posterLoadError, setPosterLoadError] = useState(false);
    const usePosterPlaceholder = movie.Poster === 'N/A' || !movie.Poster.trim() || posterLoadError;

    const isFavourite = useSelector((state: FavouritesState) =>
        state.favourites.some(favMovie => favMovie.imdbID === movie.imdbID)
    );

    useEffect(() => setPosterLoadError(false), [movie.Poster, movie.imdbID]);

    const handleFavouriteClick = () => dispatch(toggleFavourite(movie));

    // Rating class based on score
    const ratingBase = rating < 5 ? styles.lowRaiting : rating < 6 ? styles.middleRating : styles.raiting;

    // Path-based styling
    const isTrends = currentPath === '/trends';
    const isFavorites = currentPath === '/favorites';
    const isMoviePage = currentPath.startsWith('/movie/');

    if (isFavorites && !isFavourite) return null;

    return (
        <div className={cn(styles.movieCard, isMoviePage && styles.seriesCard, usePosterPlaceholder && styles.movieCardPlaceholder)}>
            <span className={cn(ratingBase, isTrends && styles.raitingTrends)}>
                <FireIcon className={cn(styles.fireIcon, isTrends && styles.trendsFireIcon)}/>
                <span>{movie.imdbRating}</span>
            </span>
            <span className={styles.favouriteIconWrapper} onClick={handleFavouriteClick}>
                <div className={divClassName || ''}>
                    <FavouriteIcon isActive={isFavourite}/>
                </div>
            </span>
            <Link to={`/movie/${movie.imdbID}`}>
                {usePosterPlaceholder ? (
                    <div className={styles.posterPlaceholder}>
                        <PosterPlaceholderIcon className={styles.placeholderIcon} />
                    </div>
                ) : (
                    <LazyImage
                        src={movie.Poster}
                        alt={movie.Title}
                        className={cn(styles.poster, (isTrends || isFavorites) && styles.trendsPoster, isMoviePage && styles.moviePoster)}
                        onError={() => setPosterLoadError(true)}
                    />
                )}
            </Link>
            <div className={styles.info}>
                <h3 className={getThemeClass('title', 'lightTitle')}>{movie.Title}</h3>
                <p className={styles.genre}>{movie.Genre.split(',').map(genre => genre.trim()).join(' • ')}</p>
            </div>
        </div>
    );
};

// Memoize component to prevent unnecessary re-renders
const MemoizedMovieCard = React.memo(MovieCard);

export { MemoizedMovieCard as MovieCard };

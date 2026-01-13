import React from 'react';
import styles from './movieCard.module.scss';
import {useLocation, Link} from "react-router-dom";
import {FavouriteIcon, FireIcon} from "../Icon/icon.component.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import {toggleFavourite} from "../../../stores/slices/favouritesSlice.ts";
import { Movie } from '../../../types';
import { useThemeStyles } from '../../../hooks/useThemeStyles';
import { LazyImage } from '../LazyImage';
import '../../../styles/_globals.scss'

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
    let ratingClass, posterClass, fireIconClass, seriesCard;

    //лежит ли  фильм в хранилище избранных
    const isFavourite = useSelector((state: RootState) =>
        state.favourites.some(favMovie => favMovie.imdbID === movie.imdbID)
    );

    const handleFavouriteClick = () => {
        dispatch(toggleFavourite(movie));
    };

    if (rating < 5) {
        ratingClass = styles.lowRaiting;
    } else if (rating >= 5 && rating < 6) {
        ratingClass = styles.middleRating;
    } else {
        ratingClass = styles.raiting;
    }

    if (currentPath === '/trends') {
        posterClass = `${styles.poster} ${styles.trendsPoster}`;
        fireIconClass = `${styles.fireIcon} ${styles.trendsFireIcon}`;
        ratingClass += ` ${styles.raitingTrends}`
        seriesCard = styles.movieCard;
    } else if (location.pathname === '/favorites' && !isFavourite) {
        return null //карточка не показывается
    } else if (currentPath === '/favorites') {
        posterClass = `${styles.poster} ${styles.trendsPoster}`;
        seriesCard = styles.movieCard;
    } else if (currentPath.startsWith('/movie/')) {
        posterClass = `${styles.poster} ${styles.moviePoster}`;
        seriesCard = `${styles.movieCard} ${styles.seriesCard}`;
        fireIconClass = styles.fireIcon;
    } else {
        posterClass = styles.poster;
        fireIconClass = styles.fireIcon;
        seriesCard = styles.movieCard;
    }


    return (
        <div className={seriesCard}>
            <span className={ratingClass}>
                <FireIcon className={fireIconClass}/>
                <span>{movie.imdbRating}</span>
            </span>
            <span className={styles.favouriteIconWrapper} onClick={handleFavouriteClick}>
                <div className={`${divClassName ? divClassName : ''}`}>
                    <FavouriteIcon  isActive={isFavourite}/>
                </div>
            </span>
            <Link to={`/movie/${movie.imdbID}`}>
                <LazyImage
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                    alt={movie.Title}
                    className={posterClass}
                />
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
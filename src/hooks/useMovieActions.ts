import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../stores/store';
import { toggleFavourite } from '../stores/slices/favouritesSlice';
import { MovieDetails } from '../types';

/**
 * Custom hook for movie actions (favourite, share)
 */
export const useMovieActions = (movieDetails: MovieDetails | null) => {
    const dispatch = useDispatch<AppDispatch>();

    // Check if movie is in favourites
    const isFavourite = useSelector((state: RootState) =>
        state.favourites.some(favMovie => favMovie.imdbID === movieDetails?.imdbID)
    );

    const handleFavouriteClick = useCallback(() => {
        if (movieDetails) {
            dispatch(toggleFavourite(movieDetails));
        }
    }, [dispatch, movieDetails]);

    const handleShareClick = useCallback(() => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Посмотрите эту страницу!',
                url: window.location.href,
            })
                .then(() => console.log('Страница успешно поделена!'))
                .catch((error) => console.log('Ошибка при попытке поделиться:', error));
        } else {
            alert('Ваш браузер не поддерживает функцию поделиться.');
        }
    }, []);

    return {
        isFavourite,
        handleFavouriteClick,
        handleShareClick
    };
};

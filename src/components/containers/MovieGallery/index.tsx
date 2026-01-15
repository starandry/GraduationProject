import React, { useEffect, useMemo, useCallback } from 'react';
import styles from './movieGallery.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavourites } from '../../../stores/slices/favouritesSlice';
import { AppDispatch, RootState } from '../../../stores/store.ts';
import { useLocation } from 'react-router-dom';
import { MIN_RATING } from '../../../constants/APIconstats.ts';
import { SectionTitle } from '../../UI/SectionTitle';
import { FilterOptions, FiltersState } from '../../../types';
import {
    selectButtons,
    selectFilters,
    clearFilters,
    clearFilterByValue,
} from '../../../stores/slices/filtersSlice.ts';
import { GallerySkeleton } from '../../UI/Skeleton';
import { FilterButtons } from './FilterButtons';
import { EmptyState } from './EmptyState';
import { ErrorMessage } from '../../UI/ErrorMessage';
import { MovieGrid } from './MovieGrid';
import {
    useFetchHighRatedMoviesQuery,
    useFetchMoviesByFilterQuery,
    useFetchMoviesBySearchQuery,
    useFetchMoviesQuery,
} from '../../../services/moviesApi';

const MovieGallery: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const { page, searchQuery } = useSelector((state: RootState) => state.movies);
    const showButtons = useSelector((state: { filters: FiltersState }) => state.filters.showButtons);
    const favourites = useSelector(selectFavourites);
    const currentPath = location.pathname;
    const selectedButtons = useSelector(selectButtons);
    const filters = useSelector(selectFilters);

    const filterOptions = useMemo<FilterOptions>(() => {
        const toOptionalNumber = (value: string) => {
            const trimmed = value.trim();
            if (trimmed === '') return undefined;
            const parsed = Number(trimmed);
            return Number.isNaN(parsed) ? undefined : parsed;
        };

        return {
            movieName: filters.movieName || undefined,
            genres: filters.genres,
            yearFrom: toOptionalNumber(filters.yearFrom),
            yearTo: toOptionalNumber(filters.yearTo),
            ratingFrom: toOptionalNumber(filters.ratingFrom),
            ratingTo: toOptionalNumber(filters.ratingTo),
            country: filters.country || undefined,
            sortBy: filters.sortBy ?? undefined,
        };
    }, [filters]);

    // Memoize computed values to prevent unnecessary recalculations
    const { galleryClass, titleHome, sectionTitleText } = useMemo(() => {
        const isTrendsOrFavorites = currentPath === '/trends' || currentPath === '/favorites';

        return {
            galleryClass: isTrendsOrFavorites
                ? `${styles.movieGallery} ${styles.movieGalleryTrends}`
                : styles.movieGallery,
            titleHome: isTrendsOrFavorites
                ? `${styles.titleHome} ${styles.titleTrends}`
                : styles.titleHome,
            sectionTitleText: currentPath === '/trends' ? 'Trends' :
                currentPath === '/favorites' ? 'Favorites' : undefined
        };
    }, [currentPath]);

    useEffect(() => {
        if (selectedButtons === '') {
            dispatch(clearFilters());
        }
    }, [selectedButtons, dispatch]);

    // Memoize callback to prevent unnecessary re-renders
    const handleBtnRemove = useCallback((btn: string) => {
        dispatch(clearFilterByValue(btn));
    }, [dispatch]);

    const {
        data: moviesData = [],
        isLoading: isMoviesLoading,
        isFetching: isMoviesFetching,
        error: moviesError,
    } = useFetchMoviesQuery(page, {
        skip: currentPath !== '/' || showButtons || searchQuery.length > 0,
    });

    const {
        data: filteredMovies = [],
        isLoading: isFilterLoading,
        error: filterError,
    } = useFetchMoviesByFilterQuery(filterOptions, {
        skip: currentPath !== '/' || !showButtons,
    });

    const {
        data: searchMovies = [],
        isLoading: isSearchLoading,
        error: searchError,
    } = useFetchMoviesBySearchQuery({ query: searchQuery, page: 1 }, {
        skip: currentPath !== '/' || searchQuery.length === 0,
    });

    const {
        data: trendsMovies = [],
        isLoading: isTrendsLoading,
        error: trendsError,
    } = useFetchHighRatedMoviesQuery({ page, minRating: MIN_RATING }, {
        skip: currentPath !== '/trends',
    });

    const galleryMovies = currentPath === '/favorites'
        ? favourites
        : currentPath === '/trends'
            ? trendsMovies
            : showButtons
                ? filteredMovies
                : searchQuery.length > 0
                    ? searchMovies
                    : moviesData;

    const isLoading = currentPath === '/favorites'
        ? false
        : currentPath === '/trends'
            ? isTrendsLoading
            : showButtons
                ? isFilterLoading
                : searchQuery.length > 0
                    ? isSearchLoading
                    : isMoviesLoading || isMoviesFetching;

    const error = currentPath === '/favorites'
        ? null
        : currentPath === '/trends'
            ? trendsError
            : showButtons
                ? filterError
                : searchQuery.length > 0
                    ? searchError
                    : moviesError;

    // Show skeleton loading state
    if (isLoading && galleryMovies.length === 0) {
        return <GallerySkeleton count={20} />;
    }

    // Show empty state for favorites
    if (currentPath === '/favorites' && favourites.length === 0) {
        return <EmptyState />;
    }

    // Show error message
    if (error) {
        const message = typeof error === 'object' && error !== null && 'error' in error
            ? String(error.error)
            : 'Не удалось загрузить фильмы';
        return <ErrorMessage message={message} />;
    }

    return (
        <>
            <SectionTitle text={sectionTitleText} className={titleHome} />
            <div className={galleryClass}>
                {showButtons && (
                    <FilterButtons
                        filters={selectedButtons}
                        onRemoveFilter={handleBtnRemove}
                    />
                )}
                <MovieGrid movies={galleryMovies} />
            </div>
        </>
    );
};

export { MovieGallery };

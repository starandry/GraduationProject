import React, { useEffect, useMemo, useCallback } from 'react';
import styles from './movieGallery.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
   fetchHighRatedMoviesAsync,
   fetchMoviesAsync,
   fetchMoviesByFilterAsync,
} from '../../../stores/slices/moviesSlice.ts';
import { selectFavourites } from '../../../stores/slices/favouritesSlice';
import { AppDispatch, RootState } from '../../../stores/store.ts';
import { useLocation } from 'react-router-dom';
import { MIN_RATING } from '../../../constants/APIconstats.ts';
import { SectionTitle } from '../../UI/SectionTitle';
import { FiltersState } from '../../../types';
import {
   selectButtons,
   selectFilters,
   clearFilters,
   clearFilterAndFetchMovies
} from '../../../stores/slices/filtersSlice.ts';
import { GallerySkeleton } from '../../UI/Skeleton';
import { FilterButtons } from './FilterButtons';
import { EmptyState } from './EmptyState';
import { ErrorMessage } from '../../UI/ErrorMessage';
import { MovieGrid } from './MovieGrid';

const MovieGallery: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const location = useLocation();
   const { movies, loading, error, page, search } = useSelector((state: RootState) => state.movies);
   const showButtons = useSelector((state: { filters: FiltersState }) => state.filters.showButtons);
   const favourites = useSelector(selectFavourites);
   const currentPath = location.pathname;
   const selectedButtons = useSelector(selectButtons);
   const filters = useSelector(selectFilters);

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
      if (showButtons) return;

      if (location.pathname === '/' ) {
         if (showButtons) {
            dispatch(fetchMoviesByFilterAsync({ filters }));
         } else if (search) {

         }
         if (movies.length < 10) {
            dispatch(fetchMoviesAsync(page));
         }
      } else if (location.pathname === '/trends') {
         dispatch(fetchHighRatedMoviesAsync({ page, minRating: MIN_RATING }))
      }
   }, [dispatch, filters, location.pathname, movies.length, page, search, showButtons]);

   // FIX: Added dependency array to prevent infinite loop
   useEffect(() =>  {
      if (selectedButtons === '') {
         dispatch(clearFilters());
      }
   }, [selectedButtons, dispatch]);

   // Memoize callback to prevent unnecessary re-renders
   const handleBtnRemove = useCallback(async (btn: string) => {
      await dispatch(clearFilterAndFetchMovies(btn)).unwrap();
   }, [dispatch]);

   const galleryMovies = currentPath === '/favorites' ? favourites : movies;

   // Show skeleton loading state
   if (currentPath !== '/favorites' && loading && movies.length === 0) {
      return <GallerySkeleton count={20} />;
   }

   // Show empty state for favorites
   if (currentPath === '/favorites' && favourites.length === 0) {
      return <EmptyState />;
   }

   // Show error message
   if (currentPath !== '/favorites' && error) {
      return <ErrorMessage message={error} />;
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

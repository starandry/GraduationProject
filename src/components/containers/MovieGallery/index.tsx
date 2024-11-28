import React, { useEffect } from 'react';
import {MovieCard} from '../../UI/MovieCard';
import styles from './movieGallery.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {
   fetchHighRatedMoviesAsync,
   fetchMoviesAsync,
   fetchMoviesByFilterAsync,
} from '../../../stores/slices/moviesSlice.ts';
import { selectFavourites } from '../../../stores/slices/favouritesSlice';
import {AppDispatch, RootState} from '../../../stores/store.ts';
import {useLocation} from 'react-router-dom';
import {MIN_RATING} from "../../../constants/APIconstats.ts";
import {SectionTitle} from "../../UI/SectionTitle";
import ImageCard from "../ImageCard";
import { FiltersState } from '../../../types';
import {
   selectButtons,
   selectFilters,
   clearFilters,
   clearFilterAndFetchMovies
} from '../../../stores/slices/filtersSlice.ts';
import { BigCloseIcon } from '../../UI/Icon/icon.component.tsx';
import { Button } from '../../UI/Button';

const MovieGallery: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const location = useLocation();
   const { movies, loading, error, page, search } = useSelector((state: RootState) => state.movies);
   const showButtons = useSelector((state: { filters: FiltersState }) => state.filters.showButtons);
   const favourites = useSelector(selectFavourites);
   const currentPath = location.pathname;
   const selectedButtons = useSelector(selectButtons);
   const filters = useSelector(selectFilters);
   let galleryClass, titleHome, sectionTitleText;

   if (currentPath === '/trends' || currentPath === '/favorites') {
      galleryClass = `${styles.movieGallery} ${styles.movieGalleryTrends}`;
      titleHome = `${styles.titleHome} ${styles.titleTrends}`;
   } else {
      galleryClass = styles.movieGallery;
      titleHome = styles.titleHome;
   }

   if (currentPath === '/trends') {
      sectionTitleText = 'Trends';
   } else if (currentPath === '/favorites') {
      sectionTitleText = 'Favorites';
   }

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
   }, [dispatch, filters, location.pathname, page, showButtons]);

   useEffect(() =>  {
      if (selectedButtons === '') {
         dispatch(clearFilters());
      }
   });

   if (loading && movies.length === 0) {
      return <p>Загрузка...</p>;
   }

   if (currentPath === '/favorites' && favourites.length === 0) {
      return <>
         <ImageCard
             imageSrc={'images/empty-state.png'}
             altText={'Empty state'} caption={'Empty state text'}/>
      </>
   }

   const handleBtnRemove = async (btn: string) => {
      await dispatch(clearFilterAndFetchMovies(btn)).unwrap();
   };

   if (error) return <p>{error}</p>;

   return (
       <>
          <SectionTitle text={sectionTitleText} className={titleHome} />
          <div className={galleryClass}>
             {showButtons && (
                 <div className={styles.btnContainer}>
                    {selectedButtons.split(', ').map((btn) => (
                        <Button key={btn} className={styles.button}>
                           <span className={styles.signGenre}>{btn}</span>
                           <BigCloseIcon onClick={() => handleBtnRemove(btn)}/>
                        </Button>
                    ))}
                 </div>
             )}
             {movies.map((movie) => (
                 <MovieCard key={movie.imdbID} movie={movie} />
             ))}
          </div>
       </>
   );
};

export { MovieGallery };


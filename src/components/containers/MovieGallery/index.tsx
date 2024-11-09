import React from 'react';
import {MovieCard} from '../../UI/MovieCard';
import styles from './movieGallery.module.scss';
import {useFetchMoviesQuery} from "../../../services/moviesApi.ts";

const MovieGallery: React.FC = () => {
   const { data: movies, error, isLoading } = useFetchMoviesQuery(1);


   /*const location = useLocation();*/
   /*useEffect(() => {
      if (location.pathname === '/' ) {
         dispatch(fetchMoviesAsync(page));
      } else if (location.pathname === '/trends') {
         dispatch(fetchHighRatedMoviesAsync({ page, minRating: MIN_RATING }))
      }
   }, [dispatch, location.pathname, page]);*/

   if (isLoading) return <p>Загрузка...</p>;
   if (error) {
      const errorMessage = 'status' in error ? `Ошибка ${error.status}` : 'Неизвестная ошибка';
      return <p>Ошибка: {errorMessage}</p>;
   }
   if (!movies || movies.length === 0) return <p>Нет данных для отображения</p>;

   return (
       <div className={styles.movieGallery}>
          {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
          ))}
       </div>
   );
};

export { MovieGallery };


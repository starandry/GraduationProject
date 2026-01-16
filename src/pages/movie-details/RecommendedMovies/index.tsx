import React from 'react';
import { Movie } from '../../../entities/movie/model/types';
import { SubTitle } from '../../../shared/ui/SubTitle';
import { CardSlider } from '../../../widgets/card-slider';
import { useThemeStyles } from '../../../entities/theme/lib/useThemeStyles';
import styles from './recommendedMovies.module.scss';

interface RecommendedMoviesProps {
    movies: Movie[];
}

/**
 * RecommendedMovies - displays recommended movies section with slider
 */
export const RecommendedMovies: React.FC<RecommendedMoviesProps> = React.memo(({ movies }) => {
    const getThemeClass = useThemeStyles(styles);

    if (!movies || movies.length === 0) return null;

    return (
        <div className={styles.wrappRecommended}>
            <div className={styles.wrapCardSlider}>
                <SubTitle className={getThemeClass('movieRecommend')} text="Recommendations" />
                <CardSlider cards={movies} />
            </div>
        </div>
    );
});

RecommendedMovies.displayName = 'RecommendedMovies';

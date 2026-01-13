import React from 'react';
import { Movie } from '../../../../types';
import { Spacer } from '../../../UI/Spacer';
import { SubTitle } from '../../../UI/SubTitle';
import { CardSlider } from '../../CardSlider';
import { useThemeStyles } from '../../../../hooks/useThemeStyles';
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
            <Spacer className={styles.recommendedSpacer} />
            <div className={styles.wrapCardSlider}>
                <SubTitle className={getThemeClass('movieRecommend')} text="Recommendations" />
                <CardSlider cards={movies} />
            </div>
        </div>
    );
});

RecommendedMovies.displayName = 'RecommendedMovies';

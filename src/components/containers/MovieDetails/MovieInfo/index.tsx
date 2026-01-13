import React from 'react';
import { MovieDetails } from '../../../../types';
import { useThemeStyles } from '../../../../hooks/useThemeStyles';
import styles from './movieInfo.module.scss';

interface MovieInfoProps {
    movie: MovieDetails;
}

interface DetailRow {
    label: string;
    value: string;
}

export const MovieInfo: React.FC<MovieInfoProps> = React.memo(({ movie }) => {
    const getThemeClass = useThemeStyles(styles);

    const details: DetailRow[] = [
        { label: 'Year:', value: movie.Year },
        { label: 'Released:', value: movie.Released },
        { label: 'BoxOffice:', value: movie.BoxOffice },
        { label: 'Country:', value: movie.Country },
        { label: 'Production:', value: movie.Production },
        { label: 'Actors:', value: movie.Actors },
        { label: 'Director:', value: movie.Director },
        { label: 'Writers:', value: movie.Writer },
    ];

    return (
        <div className={styles.movieInfo}>
            <p className={getThemeClass('plot')}>{movie.Plot}</p>
            <div className={styles.detailsWrap}>
                {details.map(({ label, value }) => (
                    <React.Fragment key={label}>
                        <span>{label}</span>
                        <p className={getThemeClass('desc')}>{value}</p>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
});

MovieInfo.displayName = 'MovieInfo';

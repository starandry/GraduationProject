import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetailsAsync, clearMovieDetails, fetchRecommendedMoviesAsync } from '../../../stores/slices/moviesSlice.ts';
import { RootState, AppDispatch  } from '../../../stores/store.ts';
import styles from './movieDetails.module.scss';
import { MovieDetails as MovieDetailsType } from '../../../types';
import { Movie } from "../../../types";
import {Wrapper} from "../Wrapper";
import {Spacer} from "../../UI/Spacer";
import {FavouriteIcon, IMDbBadge, ShareIcon} from "../../UI/Icon/icon.component.tsx";
import {toggleFavourite} from "../../../stores/slices/favouritesSlice.ts";
import {CardSlider} from "../CardSlider";
import {SubTitle} from "../../UI/SubTitle";

const MovieDetails: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const movieDetails = useSelector((state: RootState) => state.movies.movieDetails as MovieDetailsType);
    const recommendedMovies = useSelector((state: RootState) => state.movies.recommendedMovies as Movie[]);
    const loading = useSelector((state: RootState) => state.movies.loading);
    const error = useSelector((state: RootState) => state.movies.error);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    let titleMovie, plotMovie, recMovie, descMpvie, panel;

    if (isDark) {
        titleMovie = styles.title;
        plotMovie = styles.plot;
        recMovie = styles.movieRecommend;
        descMpvie = styles.desc;
        panel = styles.iconPanel;
    } else {
        titleMovie = `${styles.title} ${styles.titleLight}`;
        plotMovie = `${styles.plot} ${styles.plotLight}`;
        descMpvie = `${styles.desc} ${styles.descLight}`;
        recMovie = `${styles.movieRecommend} ${styles.recLight}`;
        panel = `${styles.iconPanel} ${styles.iconPanelLight}`;
    }

    const handleFavouriteClick = () => {
        dispatch(toggleFavourite(movieDetails));
    };

    const handleShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: "Посмотрите эту страницу!",
                url: window.location.href,
            })
                .then(() => console.log('Страница успешно поделена!'))
                .catch((error) => console.log('Ошибка при попытке поделиться:', error));
        } else {
            alert("Ваш браузер не поддерживает функцию поделиться.");
        }
    };

    //лежит ли  фильм в хранилище избранных
    const isFavourite = useSelector((state: RootState) =>
        state.favourites.some(favMovie => favMovie.imdbID === movieDetails.imdbID)
    );

    useEffect(() => {
        if (imdbID) {
            dispatch(fetchMovieDetailsAsync(imdbID));
        }

        return () => {
            dispatch(clearMovieDetails());
        };
    }, [dispatch, imdbID]);

    useEffect(() => {
        if (movieDetails) {
            const genres = movieDetails.Genre.split(',').map(genre => genre.trim());
            dispatch(fetchRecommendedMoviesAsync(genres));
        }
    }, [dispatch, movieDetails]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (!movieDetails) return null;

    return (
        <Wrapper className={styles.wrappMovieDetails}>
            <Wrapper className={styles.movieDetails}>
                <Wrapper className={styles.container}>
                    <Wrapper className={styles.wrappPoster}>
                        <img src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/300x450'}
                             alt={movieDetails.Title}
                             className={styles.poster}/>
                        <Wrapper className={panel}>
                            <span className={styles.wrapFavourite} onClick={handleFavouriteClick}>
                                <FavouriteIcon isActive={isFavourite}/>
                            </span>
                                <Spacer className={styles.divider}/>
                                <span className={styles.wrapShare} onClick={handleShareClick}>
                                <ShareIcon/>
                            </span>
                        </Wrapper>
                    </Wrapper>
                    <Wrapper className={styles.movieHeader}>
                        <p className={styles.genre}>{movieDetails.Genre.split(',').map(genre => genre.trim()).join(' • ')}</p>
                        <h2 className={titleMovie}>{movieDetails.Title}</h2>
                        <Wrapper className={styles.infoBadges}>
                <span className={styles.rating}>
                    <span>{movieDetails.imdbRating}</span>
                </span>
                            <Wrapper className={styles.IMDWrap}>
                                <IMDbBadge/>
                                <span>{movieDetails.imdbRating}</span>
                            </Wrapper>
                            <Wrapper className={styles.runtimeWrap}>
                                <span>{movieDetails.Runtime}</span>
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                    <Wrapper className={styles.movieInfo}>
                        <p className={plotMovie}>{movieDetails.Plot}</p>
                        <Wrapper className={styles.detailsWrap}>
                            <span>Year:</span><p className={descMpvie}>{movieDetails.Year}</p>
                            <span>Released:</span><p className={descMpvie}>{movieDetails.Released}</p>
                            <span>BoxOffice:</span><p className={descMpvie}>{movieDetails.BoxOffice}</p>
                            <span>Country:</span><p className={descMpvie}>{movieDetails.Country}</p>
                            <span>Production:</span><p className={descMpvie}>{movieDetails.Production}</p>
                            <span>Actors:</span><p className={descMpvie}>{movieDetails.Actors}</p>
                            <span>Director:</span><p className={descMpvie}>{movieDetails.Director}</p>
                            <span>Writers:</span><p className={descMpvie}>{movieDetails.Writer}</p>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            <Wrapper className={styles.wrappRecommended}>
                <Spacer className={styles.recommendedSpacer}/>
                <Wrapper className={styles.wrapCardSlider}>
                    <SubTitle className={recMovie} text={'Recommendations'}/>
                    <CardSlider cards={recommendedMovies}/>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
};

export {MovieDetails};
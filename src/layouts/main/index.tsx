import React, {useCallback, useState} from 'react';
import {Background, Button, Copyright, Footer} from "../../components";
import {Logo, SpinnerIcon} from "../../components/UI/Icon/icon.component.tsx";
import {SearchInput} from "../../components/UI/SearchInput";
import {UserProfile} from "../../components/containers/UserProfile";
import {Header} from "../../components/containers/Header";
import {Sidebar} from "../../components/containers/Sidebar";
import styles from './main.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { incrementPage, loadMoreMoviesAsync, fetchMoviesBySearchAsync, setSearchTrue, setSearchFalse } from '../../stores/slices/moviesSlice.ts';
import {AppDispatch, RootState} from '../../stores/store';
import {useLocation} from "react-router-dom";

const debounce = (func: (...args: never[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: never[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Main: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const { page, search } = useSelector((state: RootState) => state.movies);
    const currentPath = location.pathname;
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const [searchTerm, setSearchTerm] = useState("");
    let btnClas, customFooter;

    const handleShowMore = () => {
        dispatch(incrementPage());
        dispatch(loadMoreMoviesAsync(page));
    };

    if (currentPath === '/trends' || currentPath === '/favorites' || currentPath === '/settings' || currentPath.startsWith('/movie/')) {
        btnClas = `${styles.showMoreButton} ${styles.btnNone}`;
        customFooter = styles.customFooter;
    } else {
        btnClas = `${styles.showMoreButton}`;
    }

    if (search) btnClas = `${styles.showMoreButton} ${styles.btnNone}`;

    if (isDark) {
        btnClas += ` ${styles.btnDark}`;
    } else {
        btnClas += ` ${styles.btnLigth}`;
    }

    const handleSearchChange = () => {

    };

    const fetchMovies = useCallback(() => {
        dispatch(fetchMoviesBySearchAsync({ query: searchTerm, page: 1 })); // Фильтруем фильмы
    }, [dispatch, searchTerm]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce(() => {
        fetchMovies();
    }, 700), [fetchMovies]);

    const handleSearchInput = (value: string) => {
        setSearchTerm(value);
        debouncedSearch();
        if (value.length > 0) {
            dispatch(setSearchTrue());
        } else {
            dispatch(setSearchFalse());
        }
    };

    return (
        <Background>
            <Header>
                <Logo/>
                <SearchInput placeholder="Search" onChange={handleSearchChange} onInput={handleSearchInput}/>
                <UserProfile circleColor='#7B61FF'/>
            </Header>
            <Sidebar/>
            <Footer className={customFooter}>
                <Copyright className={styles.sidebarCopyright}/>
                <Button className={btnClas} type='button' onClick={handleShowMore}>
                    <span>Show more</span>
                    <SpinnerIcon/>
                </Button>
            </Footer>
        </Background>
    );
};

export { Main };

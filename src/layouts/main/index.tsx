import React, {useCallback} from 'react';
import {Background, Button, Copyright, Footer} from "../../components";
import {Logo, SpinnerIcon} from "../../components/UI/Icon/icon.component.tsx";
import {SearchInput} from "../../components/UI/SearchInput";
import {UserProfile} from "../../components/containers/UserProfile";
import {Header} from "../../components/containers/Header";
import {Sidebar} from "../../components/containers/Sidebar";
import styles from './main.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { incrementPage, setSearchTrue, setSearchFalse, setSearchQuery } from '../../stores/slices/moviesSlice.ts';
import {AppDispatch, RootState} from '../../stores/store';
import {useLocation} from "react-router-dom";

const debounce = (func: (...args: string[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: string[]) => {
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
    let btnClas, customFooter;

    const handleShowMore = () => {
        dispatch(incrementPage());
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

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            dispatch(setSearchQuery(value));
        }, 700),
        [dispatch]
    );

    const handleSearchInput = (value: string) => {
        debouncedSearch(value);
        if (value.length > 0) {
            dispatch(setSearchTrue());
        } else {
            dispatch(setSearchFalse());
            dispatch(setSearchQuery(''));
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

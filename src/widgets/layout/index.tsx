import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { Background } from "../background";
import { Button } from "../../shared/ui/Button";
import { Copyright } from "../copyright";
import { Footer } from "../footer";
import { Logo, SpinnerIcon } from "../../shared/ui/Icon/icon.component";
import { SearchInput } from '../../features/movie-search/ui/SearchInput';
import { UserProfile } from "../user-profile";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import styles from './main.module.scss';
import { incrementPage, setSearch, setSearchQuery } from '../../features/movie-search/model/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';

const MainLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { search } = useAppSelector((state) => state.movies);
    const currentPath = location.pathname;
    const isDark = useAppSelector((state) => state.theme.isDark);
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

    const handleSearchChange = (value: string) => {
        dispatch(setSearchQuery(value));
        dispatch(setSearch(value.trim().length > 0));
    };

    return (
        <Background>
            <Header>
                <Logo/>
                <SearchInput onChange={handleSearchChange} />
                <UserProfile circleColor='#7B61FF'/>
            </Header>
            <Sidebar>
                <Outlet />
            </Sidebar>
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

export { MainLayout };

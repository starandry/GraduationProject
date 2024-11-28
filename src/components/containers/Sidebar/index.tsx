import React from "react";
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import styles from './sidebar.module.scss';
import { menuItems, routes } from '../../../routes/menuRoutes.tsx';
import {useActivePath} from "../../../hooks/useActivePath.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";

const Sidebar: React.FC = () => {
    const { activePath, handleLinkClick } = useActivePath();
    const location = useLocation();
    const { search } = useSelector((state: RootState) => state.movies);
    const currentPath = location.pathname;
    let sidebarClass, itemSearch;

    if (currentPath === '/trends' || currentPath === '/favorites') {
        sidebarClass = `${styles.sidebarWrapp}   ${styles.trendsSidebar}`;
    } else if (currentPath === '/settings') {
        sidebarClass = `${styles.sidebarWrapp}  ${styles.trendsSidebar} ${styles.settingsSidebar}`;
    } else if (currentPath.startsWith('/movie/')) {
        sidebarClass = `${styles.sidebarWrapp}   ${styles.movieSidebar}`;
    } else {
        sidebarClass =  styles.sidebarWrapp;
    }

    if (search) {
        itemSearch = `${styles.active} ${styles.activeSearch}`;
    } else {
        itemSearch = styles.active
    }

    return (
        <div className={sidebarClass}>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={styles.navItem}>
                            <Link
                                to={item.path}
                                className={`${styles.menuLink} ${activePath === item.path ? itemSearch : ''}`}
                                onClick={() => handleLinkClick(item.path)}
                            >
                                {item.icon}
                                <span className={styles.text}>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    );
};

export {Sidebar};

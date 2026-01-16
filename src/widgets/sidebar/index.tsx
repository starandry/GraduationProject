import React from "react";
import { Link, useLocation } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { menuItems } from '../../shared/config/navigation';
import { useAppSelector } from '../../app/store/hooks';

type SidebarProps = {
    children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const location = useLocation();
    const { search } = useAppSelector((state) => state.movies);
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
                                className={`${styles.menuLink} ${currentPath === item.path ? itemSearch : ''}`}
                            >
                                {item.icon}
                                <span className={styles.text}>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {children}
        </div>
    );
};

export {Sidebar};

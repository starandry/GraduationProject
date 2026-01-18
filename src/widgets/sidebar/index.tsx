import React from "react";
import { Link, useLocation } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { menuItems } from '../../shared/config/navigation';
import { useAppSelector } from '../../app/store/hooks';

type SidebarProps = {
    children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const currentPath = useLocation().pathname;
    const { search } = useAppSelector((state) => state.movies);

    const sidebarClass = currentPath === '/trends' || currentPath === '/favorites'
        ? `${styles.sidebarWrapp} ${styles.trendsSidebar}`
        : currentPath === '/settings'
        ? `${styles.sidebarWrapp} ${styles.trendsSidebar} ${styles.settingsSidebar}`
        : currentPath.startsWith('/movie/')
        ? `${styles.sidebarWrapp} ${styles.movieSidebar}`
        : styles.sidebarWrapp;

    const activeClass = search ? `${styles.active} ${styles.activeSearch}` : styles.active;

    return (
        <div className={sidebarClass}>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={styles.navItem}>
                            <Link
                                to={item.path}
                                className={`${styles.menuLink} ${currentPath === item.path ? activeClass : ''}`}
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

export { Sidebar };

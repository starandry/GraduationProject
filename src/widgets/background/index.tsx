import React from 'react';
import styles from './background.module.scss';
import { useLocation } from "react-router-dom";
import { useAppSelector } from '../../app/store/hooks';
import '../../shared/styles/_globals.scss';
import { ComponentWithChildren } from "../../shared/types";

const Background: React.FC<ComponentWithChildren> = ({ children }) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    const isMoviePage = useLocation().pathname.startsWith('/movie/');
    const className = `${styles.background} ${isMoviePage ? styles.backgroundMovie : ''} ${isDark ? 'dark' : 'light'}`;

    return <div className={className}>{children}</div>;
};

export { Background };

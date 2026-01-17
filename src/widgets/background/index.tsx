import React from 'react';
import styles from './background.module.scss';
import {useLocation} from "react-router-dom";
import { useAppSelector } from '../../app/store/hooks';
import '../../shared/styles/_globals.scss';
import { ComponentWithChildren } from "../../shared/types";

const Background: React.FC<ComponentWithChildren> = ({ children }) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    const location = useLocation();
    const currentPath = location.pathname;
    let compBackground;

    if (currentPath.startsWith('/movie/')) {
        compBackground = `${styles.background} ${styles.backgroundMovie}`;
    } else {
        compBackground = `${styles.background}`;
    }

    if (isDark) {
        compBackground += ` dark`;
    } else {
        compBackground += ` light`;
    }

    return <div className={compBackground}>{children}</div>;
};

export { Background };

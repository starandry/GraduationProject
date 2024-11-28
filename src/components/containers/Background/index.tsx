import React from 'react';
import styles from './background.module.scss';
import {useLocation} from "react-router-dom";
import { RootState } from '../../../stores/store.ts';
import {useSelector} from "react-redux";
import '../../../styles/_globals.scss';
import { ComponentWithChildren } from "../../../types";

const Background: React.FC<ComponentWithChildren> = ({ children }) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const location = useLocation();
    const currentPath = location.pathname;
    let compBackground;

    if(currentPath === '/settings') {
        compBackground = `${styles.background} ${styles.backgroundSettings}`;
    } else if (currentPath.startsWith('/movie/')) {
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

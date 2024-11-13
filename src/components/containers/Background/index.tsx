import React, { ReactNode } from 'react';
import styles from './background.module.scss';
import {useLocation} from "react-router-dom";
import { RootState } from '../../../stores/store.ts';
import {useSelector} from "react-redux";
import '../../../styles/_globals.scss';

type BackgroundProps = {
    children: ReactNode;
};

const Background: React.FC<BackgroundProps> = ({ children }) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const location = useLocation();
    const currentPath = location.pathname;
    let compBackground;

    if(currentPath === '/settings') {
        compBackground = `${styles.background} ${styles.backgroundSettings}`;
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

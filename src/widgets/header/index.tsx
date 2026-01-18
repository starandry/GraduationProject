import React from 'react';
import styles from './header.module.scss';
import { ComponentWithChildren } from "../../shared/types";
import { useAppSelector } from '../../app/store/hooks';

const Header: React.FC<ComponentWithChildren> = ({ children }) => {
    const isHamburgerOpen = useAppSelector((state) => state.hamburger.isOpen);
    const childrenArray = React.Children.toArray(children);

    return (
        <div className={`${styles.header} ${isHamburgerOpen ? styles.headerHumb : ''}`}>
            <div className={styles.headerLeft}>{childrenArray[0]}</div>
            <div className={styles.headerRight}>{childrenArray.slice(1)}</div>
        </div>
    );
};

export { Header };

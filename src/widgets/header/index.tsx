import React from 'react';
import styles from './header.module.scss';
import { ComponentWithChildren } from "../../shared/types";
import { useAppSelector } from '../../app/store/hooks';



const Header: React.FC<ComponentWithChildren> = ({ children }) => {
    const isHamburgerOpen = useAppSelector((state) => state.hamburger.isOpen); // Получаем состояние гамбургера
    let compHeader = styles.header;
    // Логика на основе состояния гамбургера
    if (isHamburgerOpen) {
        compHeader = `${styles.header} ${styles.headerHumb}`; // Добавляем класс, если гамбургер открыт
    }

    const childrenArray = React.Children.toArray(children);
    const logo = childrenArray[0];
    const rest = childrenArray.slice(1);

    return  <div className={compHeader}>
        <div className={styles.headerLeft}>{logo}</div>
        <div className={styles.headerRight}>{rest}</div>
    </div>
}

export { Header };

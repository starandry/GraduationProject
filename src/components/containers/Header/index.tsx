import React from 'react';
import styles from './header.module.scss';
import {ComponentWithChildren} from "../../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";



const Header: React.FC<ComponentWithChildren> = ({ children }) => {
    const isHamburgerOpen = useSelector((state: RootState) => state.hamburger.isOpen); // Получаем состояние гамбургера
    let compHeader = styles.header;
    // Логика на основе состояния гамбургера
    if (isHamburgerOpen) {
        compHeader = `${styles.header} ${styles.headerHumb}`; // Добавляем класс, если гамбургер открыт
    }

    return  <div className={compHeader}>
        {children}
    </div>
}

export { Header };
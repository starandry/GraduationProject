import React, { useState } from 'react';
import styles from './userProfile.module.scss';
import { ArrowDown, CloseIcon, Hamburger } from '../../UI/Icon/icon.component.tsx';
import { menuItems } from '../../../routes/menuRoutes.tsx';
import { Link, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import { toggleMenu, closeMenu } from '../../../stores/slices/hamburgerSlice.ts';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../stores/store.ts';
import { Logout } from '../Logout';
import { useThemeStyles } from '../../../hooks/useThemeStyles';

export type UserProfileProps = {
    circleColor: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ circleColor }) => {
    const isHamburgerOpen = useSelector((state: RootState) => state.hamburger.isOpen);
    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useDispatch<AppDispatch>();
    const emailInStore = useSelector((state: RootState) => state.auth.emailInStore);
    const [showLogout, setShowLogout] = useState(false);
    const getThemeClass = useThemeStyles(styles);

    const getUsernameByEmail = (email: string): string | null => {
        // Получаем данные пользователей из localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Ищем пользователя по email
        const user = users.find((user: { email: string }) => user.email === email);

        // Если пользователь найден, возвращаем его username, иначе null
        return user ? user.username : null;
    };

    getUsernameByEmail(emailInStore);
    const userInitials = getUsernameByEmail(emailInStore).slice(0, 2).toUpperCase();

    const compUserIfo = isHamburgerOpen
        ? `${styles.userInfo} ${styles.userInfoHumb}`
        : styles.userInfo;

    const toggleHamburger = () => {
        dispatch(toggleMenu());
    };

    const closeHamburger = () => {
        dispatch(closeMenu());
    };

    const handleClick = () => {
        setShowLogout(!showLogout);
    };

    return (
        <div className={styles.userProfile}>
            <div className={compUserIfo}>
                <div className={styles.circle} style={{ backgroundColor: circleColor }} onClick={toggleHamburger}>
                    <span className={styles.userInitials}>{userInitials}</span>
                    <Hamburger className={styles.hamburger} />
                </div>
                <span className={getThemeClass('userName', 'lightUserName')}>{emailInStore}</span>
                <ArrowDown className={styles.arrowDown} onClick={handleClick}/>
                {showLogout && <Logout/>}
            </div>

            <div className={`${getThemeClass('menuItems', 'menuItemsLight')} ${isHamburgerOpen ? styles.open : ''}`}>
                <div className={styles.closeIcon} onClick={closeHamburger}>
                    <CloseIcon />
                </div>
                <div className={styles.wrappHamb}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.menuLink} ${currentPath === item.path ? styles.active : ''}`}
                            onClick={closeHamburger}
                        >
                            {item.icon}
                            <span className={styles.text}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { UserProfile };

import React, { useState } from 'react';
import styles from './userProfile.module.scss';
import { ArrowDown, CloseIcon, Hamburger } from '../../UI/Icon/icon.component.tsx';
import { menuItems } from '../../../routes/menuRoutes.tsx';
import { Link } from "react-router-dom";
import { useActivePath } from '../../../hooks/useActivePath.ts';
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import { toggleMenu, closeMenu } from '../../../stores/slices/hamburgerSlice.ts';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../stores/store.ts';
import { Logout } from '../Logout';

export type UserProfileProps = {
    circleColor: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ circleColor }) => {
    const isHamburgerOpen = useSelector((state: RootState) => state.hamburger.isOpen); // Получаем состояние из Redux
    const { activePath, handleLinkClick } = useActivePath();
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const dispatch = useDispatch<AppDispatch>();
    const emailInStore = useSelector((state: RootState) => state.auth.emailInStore);
    const [showLogout, setShowLogout] = useState(false); //  для отображения компонента logout
    let compName, compUserIfo, compMenuItems;

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


    if (isDark) {
        compName = styles.userName;
        compMenuItems = styles.menuItems;
    } else {
        compName = `${styles.userName} ${styles.lightUserName}`;
        compMenuItems = `${styles.menuItems} ${styles.menuItemsLight}`;
    }

    if (isHamburgerOpen) {
        compUserIfo = `${styles.userInfo} ${styles.userInfoHumb}`;
    } else {
        compUserIfo =  styles.userInfo;
    }

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
                <span className={compName}>{emailInStore}</span>
                <ArrowDown className={styles.arrowDown} onClick={handleClick}/>
                {showLogout && <Logout/>}
            </div>

            <div className={`${compMenuItems} ${isHamburgerOpen ? styles.open : ''}`}>
                <div className={styles.closeIcon} onClick={closeHamburger}>
                    <CloseIcon />
                </div>
                <div className={styles.wrappHamb}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.menuLink} ${activePath === item.path ? styles.active : ''}`}
                            onClick={() => handleLinkClick(item.path)}
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

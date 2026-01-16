import React, { useEffect, useRef, useState } from 'react';
import styles from './userProfile.module.scss';
import { ArrowDown, CloseIcon, Hamburger } from '../../shared/ui/Icon/icon.component';
import { menuItems } from '../../shared/config/navigation';
import { Link, useLocation } from "react-router-dom";
import { toggleMenu, closeMenu } from '../../features/hamburger/model/hamburgerSlice';
import { Logout } from '../../features/auth/ui/Logout';
import { useThemeStyles } from '../../entities/theme/lib/useThemeStyles';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';

export type UserProfileProps = {
    circleColor: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ circleColor }) => {
    const isHamburgerOpen = useAppSelector((state) => state.hamburger.isOpen);
    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useAppDispatch();
    const emailInStore = useAppSelector((state) => state.auth.emailInStore);
    const [showLogout, setShowLogout] = useState(false);
    const userInfoRef = useRef<HTMLDivElement | null>(null);
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
        setShowLogout((prev) => !prev);
    };

    useEffect(() => {
        if (!showLogout) return;

        const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
            const target = event.target;
            if (!target || !(target instanceof Node)) return;
            if (!userInfoRef.current) return;
            if (userInfoRef.current.contains(target)) return;
            setShowLogout(false);
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [showLogout]);

    return (
        <div className={styles.userProfile}>
            <div className={compUserIfo} ref={userInfoRef}>
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

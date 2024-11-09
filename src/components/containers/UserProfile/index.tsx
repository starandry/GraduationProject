import React, { useState } from 'react';
import styles from './userProfile.module.scss';
import { Hamburger } from "../../UI/Icon/icon.component.tsx";
import { menuItems } from '../../../routes/menuRoutes.tsx';
import { Link } from "react-router-dom";
/*import { useActivePath } from '../../../hooks/useActivePath.ts';*/

interface UserProfileProps {
    name: string;
    circleColor: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, circleColor }) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
   /* const { activePath, handleLinkClick } = useActivePath();*/

    const toggleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    return (
        <div className={styles.userProfile}>
            <div className={styles.userInfo}>
                <div
                    className={styles.circle}
                    style={{ backgroundColor: circleColor }}
                    onClick={toggleHamburger}
                >
                    <Hamburger className={styles.hamburger} />
                </div>
                <span className={styles.userName}>{name}</span>
            </div>

            <div className={`${styles.menuItems} ${isHamburgerOpen ? styles.open : ''}`}>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                      /*  className={`${styles.menuLink} ${activePath === item.path ? styles.active : ''}`}
                        onClick={() => handleLinkClick(item.path)}*/
                    >
                        {item.icon}
                        <span className={styles.text}>{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export { UserProfile };

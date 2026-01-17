import React from "react";
import styles from './auth.module.scss';
import { Outlet } from 'react-router-dom';
import { Logo } from "../../../shared/ui/Icon/icon.component";
import { Copyright } from '../../../widgets/copyright';

const AuthLayout: React.FC = () => {
    const collageSrc = `${import.meta.env.BASE_URL}images/collage-of-movie-posters.jpg`;

    return <>
        <img src={collageSrc}
             alt={'collage-of-movie'}
             className={styles.img}/>
        <div className={styles.wrapAuth}>
            <div className={styles.wrapLogo}>
                <Logo/>
            </div>
            <Outlet />
            <div className={styles.wrapCopyright}>
                <Copyright className={styles.copyrightAuth}/>
            </div>
        </div>

    </>
};

export { AuthLayout };

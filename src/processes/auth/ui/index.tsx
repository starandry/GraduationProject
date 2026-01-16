import React from "react";
import styles from './auth.module.scss';
import { Outlet } from 'react-router-dom';
import { Logo } from "../../../shared/ui/Icon/icon.component";
import { Copyright } from '../../../widgets/copyright';

const AuthLayout: React.FC = () => {
    return <>
        <img src={'/images/collage-of-movie-posters.jpg'}
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

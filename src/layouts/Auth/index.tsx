import React from "react";
import styles from './auth.module.scss';
import {Logo} from "../../components/UI/Icon/icon.component.tsx";
import { Copyright, LoginForm, NewPasswordForm, RegistrationForm, ResetPasswordForm } from '../../components';
import { Route, Routes } from 'react-router-dom';

const Auth: React.FC = () => {


    return <>
        <img src={'images/collage-of-movie-posters.jpg'}
             alt={'collage-of-movie'}
             className={styles.img}/>
        <div className={styles.wrapAuth}>
            <div className={styles.wrapLogo}>
                <Logo/>
            </div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/signup" element={<RegistrationForm />} />
                <Route path="/reset" element={<ResetPasswordForm />} />
                <Route path="/password" element={<NewPasswordForm />} />
            </Routes>
            <div className={styles.wrapCopyright}>
                <Copyright className={styles.copyrightAuth}/>
            </div>
        </div>

    </>
};

export { Auth };

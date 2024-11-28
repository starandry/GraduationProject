import React from "react";
import styles from './auth.module.scss';
import {Logo} from "../../components/UI/Icon/icon.component.tsx";
import { Copyright, LoginForm, NewPasswordForm, RegistrationForm, ResetPasswordForm, Wrapper } from '../../components';
import { Route, Routes } from 'react-router-dom';

const Auth: React.FC = () => {


    return <>
        <img src={'images/collage-of-movie-posters.jpg'}
             alt={'collage-of-movie'}
             className={styles.img}/>
        <Wrapper className={styles.wrapAuth}>
            <Wrapper className={styles.wrapLogo}>
                <Logo/>
            </Wrapper>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/signup" element={<RegistrationForm />} />
                <Route path="/reset" element={<ResetPasswordForm />} />
                <Route path="/password" element={<NewPasswordForm />} />
            </Routes>
            <Wrapper className={styles.wrapCopyright}>
                <Copyright className={styles.copyrightAuth}/>
            </Wrapper>
        </Wrapper>

    </>
};

export { Auth };

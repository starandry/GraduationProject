import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link } from 'react-router-dom';
import styles from './loginForm.module.scss';
import { setAuthenticated, setSuccessMessage, setUsername } from '../../../stores/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserCredentials } from '../../../services/authService.ts'
import { RootState } from '../../../stores/store.ts';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); //  для ошибки
    const dispatch = useDispatch();
    const successMessage = useSelector((state: RootState) => state.auth.successMessage);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    let title, form;

    if (isDark) {
        title = styles.title;
        form = styles.loginForm;
    } else {
        title = `${styles.title} ${styles.titleLight}`;
        form = `${styles.loginForm} ${styles.loginFormLight}`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await checkUserCredentials(email, password);
        dispatch(setUsername(result.username));

        if (result.success) {
            dispatch(setAuthenticated(true));
            setError(null); // удаление сообщения об ошибке, если логин успешен
        } else {
            setError(result.error || 'Unknown error'); //  сообщение об ошибке
        }

        dispatch(setSuccessMessage(''));
    };

    return (
        <form onSubmit={handleSubmit} className={form}>
            <h2 className={title}>Sign In</h2>

            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

            <Input
                type="email"
                className={styles.inputEmail}
                id="log-email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                className={styles.inputPassword}
                id="log-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
            />

            <div className={styles.forgotPassword}>
                <Link to="reset">Forgot password?</Link>
            </div>

            <Button type="submit" className={styles.btnLogin}>Sign in</Button>

            <p className={styles.basement}>
                Don’t have an account?
                <Link to="signup" className={styles.signupLink}>Sign Up</Link>
            </p>
        </form>
    );
};

export { LoginForm };
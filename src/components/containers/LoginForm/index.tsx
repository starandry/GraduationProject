import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link } from 'react-router-dom';
import styles from './loginForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store.ts';
import { clearSuccessMessage, setAuthenticated, setEmailInStore } from '../../../stores/slices/authSlice.ts';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { successMessage } = useSelector((state: RootState) => state.auth);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const dispatch = useDispatch();
    let title, form, mess;



    if (isDark) {
        title = styles.title;
        form = styles.loginForm;
        mess = styles.successMessage;
    } else {
        title = `${styles.title} ${styles.titleLight}`;
        form = `${styles.loginForm} ${styles.loginFormLight}`;
        mess =` ${styles.successMessage} ${styles.successMessageLight}`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // ошибки
        setError(null);

        const checkCredentialsInLocalStorage = (email: string, password: string): string | null => {
            const users = JSON.parse(localStorage.getItem('users'));

            const user = users.find(
                (user: { email: string; password: string }) => user.email === email
            );

            if (!user) {
                return 'email';
            }

            if (user.password !== password) {
                return 'password';
            }

            return null;  // Если оба поля верны
        };
        
        const res = checkCredentialsInLocalStorage(email, password);

        if (res) {
            setError(`Пользователя с таким ${res} не существует`);
        } else {
            dispatch(setAuthenticated(true));
            dispatch(clearSuccessMessage());
            dispatch(setEmailInStore(email));
        }
    };

    return (
        <form onSubmit={handleSubmit} className={form}>
            <h2 className={title}>Sign In</h2>

            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={mess}>{successMessage}</p>}

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
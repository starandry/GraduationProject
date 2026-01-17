import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Link } from 'react-router-dom';
import styles from './loginForm.module.scss';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@app/store/hooks.ts';
import { clearSuccessMessage, setAuthenticated, setEmailInStore } from '../../model/authSlice';
import { useThemeStyles } from '@entities/theme/lib/useThemeStyles.ts';
import { useToast } from '@entities/notification/lib/useToast.ts';
import { AuthService } from '@shared/lib/authService.ts';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { successMessage } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();
    const getThemeClass = useThemeStyles(styles);
    const toast = useToast();
    const lastShownSuccessMessageRef = useRef<string | null>(null);

    // Show success message from registration as toast
    useEffect(() => {
        if (!successMessage) {
            lastShownSuccessMessageRef.current = null;
            return;
        }

        if (lastShownSuccessMessageRef.current === successMessage) {
            dispatch(clearSuccessMessage());
            return;
        }

        lastShownSuccessMessageRef.current = successMessage;
        toast.success(successMessage);
        dispatch(clearSuccessMessage());
    }, [successMessage, toast, dispatch]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await AuthService.checkCredentials(email, password);

        if (!result.valid) {
            toast.error(`Пользователя с таким ${result.error} не существует`);
        } else {
            toast.success('Успешный вход в систему!');
            dispatch(setAuthenticated(true));
            dispatch(setEmailInStore(email));
        }
    }, [email, password, toast, dispatch]);

    return (
        <form onSubmit={handleSubmit} className={getThemeClass('loginForm')}>
            <h2 className={getThemeClass('title')}>Sign In</h2>

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

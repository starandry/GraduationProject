import React, { FC, useEffect, useRef, useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import { Link } from 'react-router-dom';
import styles from './loginForm.module.scss';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../app/store/hooks';
import { clearSuccessMessage, setAuthenticated, setEmailInStore } from '../../model/authSlice';
import { useThemeStyles } from '../../../../entities/theme/lib/useThemeStyles';
import { verifyPassword, hashPassword, isHashed } from '../../../../shared/lib/crypto';
import { useToast } from '../../../../entities/notification/lib/useToast';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const checkCredentialsInLocalStorage = async (email: string, password: string): Promise<string | null> => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            const user = users.find(
                (user: { email: string; password: string }) => user.email === email
            );

            if (!user) {
                return 'email';
            }

            // Проверяем, хеширован ли пароль
            if (isHashed(user.password)) {
                // Сравниваем хеши
                const isValid = await verifyPassword(password, user.password);
                if (!isValid) {
                    return 'password';
                }
            } else {
                // Старый plain text пароль - мигрируем
                if (user.password !== password) {
                    return 'password';
                }
                // Хешируем и обновляем
                user.password = await hashPassword(password);
                localStorage.setItem('users', JSON.stringify(users));
            }

            return null;  // Если оба поля верны
        };

        const res = await checkCredentialsInLocalStorage(email, password);

        if (res) {
            toast.error(`Пользователя с таким ${res} не существует`);
        } else {
            toast.success('Успешный вход в систему!');
            dispatch(setAuthenticated(true));
            dispatch(setEmailInStore(email));
        }
    };

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

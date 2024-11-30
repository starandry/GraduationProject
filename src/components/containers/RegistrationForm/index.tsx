import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registrationForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store.ts';
import { setSuccessMessage } from '../../../stores/slices/authSlice.ts';
import { EMAILREGEX, PASSWORDREGEX } from '../../../constants/AuthConstants.ts'

const RegistrationForm: FC = () => {
    const [localUsername, setLocalUsername] = useState<string>('');
    const [localEmail, setEmail] = useState<string>('');
    const [localPassword, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let form, title;

    if (isDark) {
        form = styles.registrationForm;
        title = styles.title;
    } else {
        form = `${styles.registrationForm} ${styles.registrationFormLight}`;
        title = `${styles.title} ${styles.titleLight}`;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на совпадение паролей
        if (localPassword !== confirmPassword) {
            setError('Пароли не совпадают.');
            return;
        }

        // Проверка формата email
        if (!EMAILREGEX.test(localEmail)) {
            setError('Неверный формат email.');
            return;
        }

        // Проверка на сложность пароля
        if (!PASSWORDREGEX.test(localPassword)) {
            setError(
                'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.'
            );
            return;
        }

        const users = JSON.parse(localStorage.getItem('users'));

        function getUsernameOrEmailIfExists(localUsername: string, localEmail: string): string | null {
            const user = users.find(
                (user: { username: string; email: string }) =>
                    user.username === localUsername || user.email === localEmail
            );

            if (user) {
                if (user.username === localUsername) {
                    return 'username';
                } else {
                    return 'email';
                }
            }

            return null;
        }

        const field = getUsernameOrEmailIfExists(localUsername, localEmail);

        if (field) {
            setError(`Пользователь с таким ${field} уже существует.`);
            return;
        }

        // Если все проверки прошли успешно, сохраняем данные в localStorage
        const userObject = {
            username: localUsername,
            email: localEmail,
            password: localPassword,
        };

        users.push(userObject);
        localStorage.setItem('users', JSON.stringify(users));
        // Отправляем сообщение об успехе
        dispatch(setSuccessMessage('Вы успешно зарегистрированы в системе!'));

        // Перенаправляем пользователя
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className={form}>
            <h2 className={title}>Sign Up</h2>

            {error && <p className={styles.error}>{error}</p>}

            <Input
                type="text"
                className={styles.inputUsername}
                id="username"
                label="Username"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                placeholder="Your username"
                required
            />

            <Input
                type="email"
                className={styles.inputEmail}
                id="email"
                label="Email"
                value={localEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                className={styles.inputPassword}
                id="password"
                label="Password"
                value={localPassword}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
            />

            <Input
                type="password"
                className={styles.inputConfirmPassword}
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
            />

            <Button type="submit" className={styles.btnRegister}>
                Sign Up
            </Button>

            <p className={styles.basement}>
                Already have an account?
                <Link to="/" className={styles.signLink}>
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export { RegistrationForm };
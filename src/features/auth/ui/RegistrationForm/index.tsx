import React, { FC, useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registrationForm.module.scss';
import { useDispatch } from 'react-redux';
import { setSuccessMessage } from '../../model/authSlice';
import { EMAILREGEX, PASSWORDREGEX } from '../../../../shared/config/auth';
import { useThemeStyles } from '../../../../entities/theme/lib/useThemeStyles';
import { hashPassword } from '../../../../shared/lib/crypto';
import { useToast } from '../../../../entities/notification/lib/useToast';

const RegistrationForm: FC = () => {
    const [localUsername, setLocalUsername] = useState<string>('');
    const [localEmail, setEmail] = useState<string>('');
    const [localPassword, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getThemeClass = useThemeStyles(styles);
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на совпадение паролей
        if (localPassword !== confirmPassword) {
            toast.error('Пароли не совпадают.');
            return;
        }

        // Проверка формата email
        if (!EMAILREGEX.test(localEmail)) {
            toast.error('Неверный формат email.');
            return;
        }

        // Проверка на сложность пароля
        if (!PASSWORDREGEX.test(localPassword)) {
            toast.error(
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
            toast.error(`Пользователь с таким ${field} уже существует.`);
            return;
        }

        // Если все проверки прошли успешно, сохраняем данные в localStorage
        // Хешируем пароль для безопасности
        const hashedPassword = await hashPassword(localPassword);

        const userObject = {
            username: localUsername,
            email: localEmail,
            password: hashedPassword, // Сохраняем хеш, а не plain text
        };

        users.push(userObject);
        localStorage.setItem('users', JSON.stringify(users));
        // Отправляем сообщение об успехе
        dispatch(setSuccessMessage('Вы успешно зарегистрированы в системе!'));

        // Перенаправляем пользователя
        navigate('/auth');
    };

    return (
        <form onSubmit={handleSubmit} className={getThemeClass('registrationForm')}>
            <h2 className={getThemeClass('title')}>Sign Up</h2>

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
                <Link to="/auth" className={styles.signLink}>
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export { RegistrationForm };

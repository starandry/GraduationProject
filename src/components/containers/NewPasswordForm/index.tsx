import React, { FC, useState } from 'react';
import { Input } from '../../UI/Input';
import styles from './newPasswordForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { setSuccessMessage } from '../../../stores/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store.ts';
import { PASSWORDREGEX } from '../../../constants/AuthConstants.ts'

const NewPasswordForm: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const emailInStore = useSelector((state: RootState) => state.auth.emailInStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let title, form;

    if (isDark) {
        title = styles.title;
        form = styles.newPasswordForm;
    } else {
        title = `${styles.title} ${styles.titleLight}`;
        form = `${styles.newPasswordForm} ${styles.newPasswordFormLight}`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Пароли не совпадают!');
            return;
        }

        if (!PASSWORDREGEX.test(password)) {
            setError('Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users'));

        const userIndex = users.findIndex((user: { email: string }) => user.email === emailInStore);
        users[userIndex].password = password;
        // Сохраняем обновленный массив пользователей обратно в localStorage
        localStorage.setItem('users', JSON.stringify(users));

        dispatch(setSuccessMessage('Ваш пароль успешно изменён'));

        // Очистка локальных состояний
        setPassword('');
        setConfirmPassword('');
        setError(null);

        navigate('/');
    };


    return (
        <form onSubmit={handleSubmit} className={form}>
            <h2 className={title}>New Password</h2>

            {error && <p className={styles.error}>{error}</p>}

            <Input
                type="password"
                className={styles.newPasswordInput}
                id="new-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
            />

            <Input
                type="password"
                className={styles.newPasswordInput}
                id="new-confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
            />

            <button
                type="submit"
                onClick={handleSubmit}
                className={styles.btnNewPassw}
            >
                Set password
            </button>
        </form>
    );
};

export { NewPasswordForm };

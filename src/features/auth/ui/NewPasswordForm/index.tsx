import React, { FC, useCallback, useState } from 'react';
import { Input } from '@shared/ui/Input';
import styles from './newPasswordForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { setSuccessMessage } from '../../model/authSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@app/store/hooks.ts';
import { useThemeStyles } from '@entities/theme/lib/useThemeStyles.ts';
import { AuthService } from '@shared/lib/authService.ts';

const NewPasswordForm: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const emailInStore = useAppSelector((state) => state.auth.emailInStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getThemeClass = useThemeStyles(styles);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Пароли не совпадают!');
            return;
        }

        if (!AuthService.validatePassword(password)) {
            setError('Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.');
            return;
        }

        const success = await AuthService.updatePassword(emailInStore, password);

        if (!success) {
            setError('Не удалось обновить пароль!');
            return;
        }

        dispatch(setSuccessMessage('Ваш пароль успешно изменён'));
        setPassword('');
        setConfirmPassword('');
        setError(null);
        navigate('/auth');
    }, [password, confirmPassword, emailInStore, dispatch, navigate]);


    return (
        <form onSubmit={handleSubmit} className={getThemeClass('newPasswordForm')}>
            <h2 className={getThemeClass('title')}>New Password</h2>

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
                className={styles.btnNewPassw}
            >
                Set password
            </button>
        </form>
    );
};

export { NewPasswordForm };

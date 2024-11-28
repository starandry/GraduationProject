import React, { FC, useEffect, useState } from 'react';
import { Input } from '../../UI/Input';
import styles from './newPasswordForm.module.scss';
import { auth } from '../../../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { setSuccessMessage } from '../../../stores/slices/authSlice';
import { useDispatch } from 'react-redux';

const NewPasswordForm: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [oobCode, setOobCode] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Получение oobCode из URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('oobCode');
        if (code) {
            setOobCode(code);
            verifyPasswordResetCode(auth, code)
                .then()
                .catch((err) => {
                    console.error('Invalid code:', err);
                    setError('The password reset link is invalid or has expired. Please request a new one.');
                });
        } else {
            setError('No password reset code found in the URL.');
        }
    }, [location.search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!oobCode) {
            setError('Password reset code is missing.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            // Проверка значений для отладки
            console.log('Attempting password reset with:', { oobCode, password });

            // Подтверждаем сброс пароля
            await confirmPasswordReset(auth, oobCode, password);
            console.log(password);

            setError(null);
            dispatch(setSuccessMessage('Your password has been changed!'));
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            console.error('Error updating password:', err);
            setError('Failed to reset password. Please try again.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className={styles.newPasswordForm}>
            <h2 className={styles.title}>New Password</h2>

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

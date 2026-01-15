import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import styles from './resetPasswordForm.module.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmailInStore } from '../../../stores/slices/authSlice.ts';
import { useThemeStyles } from '../../../hooks/useThemeStyles';

const ResetPasswordForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getThemeClass = useThemeStyles(styles);

    function checkEmailInLocalStorage(email: string): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const user = users.find((user: { email: string }) => user.email === email);

        return user === undefined;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (checkEmailInLocalStorage(email)) {
            setError('Email не совпадает с зарегистрированным!');
            return;
        }
        setError(null);
        dispatch(setEmailInStore(email));
        navigate('/auth/password');
    };

    return (
        <form onSubmit={handleSubmit} className={getThemeClass('resetPasswordForm')}>
            <h2 className={getThemeClass('title')}>Reset Password</h2>

            {error && <p className={styles.error}>{error}</p>}

            <Input
                type="email"
                className={styles.inputReset}
                id="reset-email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Button type="submit" className={styles.btnReset}>Reset</Button>
        </form>
    );
};

export { ResetPasswordForm };

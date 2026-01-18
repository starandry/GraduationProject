import React, { FC, useCallback, useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import styles from './resetPasswordForm.module.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmailInStore } from '../../model/authSlice';
import { useThemeStyles } from '@entities/theme/lib/useThemeStyles.ts';
import { AuthService } from '@shared/lib/authService.ts';
import { useForm } from '@shared/lib/useForm.ts';

const ResetPasswordForm: FC = () => {
    const { values, handleChange } = useForm({ email: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getThemeClass = useThemeStyles(styles);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!AuthService.checkEmailExists(values.email)) {
            setError('Email не совпадает с зарегистрированным!');
            return;
        }
        setError(null);
        dispatch(setEmailInStore(values.email));
        navigate('/auth/password');
    }, [values.email, dispatch, navigate]);

    return (
        <form onSubmit={handleSubmit} className={getThemeClass('resetPasswordForm')}>
            <h2 className={getThemeClass('title')}>Reset Password</h2>

            {error && <p className={styles.error}>{error}</p>}

            <Input
                type="email"
                className={styles.inputReset}
                id="reset-email"
                label="Email"
                value={values.email}
                onChange={handleChange('email')}
                placeholder="Your email"
                required
            />

            <Button type="submit" className={styles.btnReset}>Reset</Button>
        </form>
    );
};

export { ResetPasswordForm };

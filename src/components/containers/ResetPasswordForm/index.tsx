import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import styles from './resetPasswordForm.module.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import { useNavigate } from 'react-router-dom'; // FirebaseError для обработки ошибок

const ResetPasswordForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { emailInStore } = useSelector((state: RootState) => state.auth);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const navigate = useNavigate();

    let title, form;

    if (isDark) {
        title = styles.title;
        form = styles.resetPasswordForm;
    } else {
        title = `${styles.title} ${styles.titleLight}`;
        form = `${styles.resetPasswordForm} ${styles.resetPasswordFormLight}`;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email !== emailInStore) {
            setError('Email не совпадает с зарегистрированным!');
            return;
        }

        setError(null);
        navigate('/password');
    };

    return (
        <form onSubmit={handleSubmit} className={form}>
            <h2 className={title}>Reset Password</h2>

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

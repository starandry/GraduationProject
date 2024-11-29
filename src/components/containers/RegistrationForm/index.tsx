import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link } from 'react-router-dom';
import styles from './registrationForm.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../../stores/store.ts";
import { setUsername, setEmailInStore, setPasswordInStore } from '../../../stores/slices/authSlice.ts';

const RegistrationForm: FC = () => {
    const [localUsername, setLocalUsername] = useState<string>('');
    const [localEmail, setEmail] = useState<string>('');
    const [localPassword, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { usernameInStore, emailInStore, passwordInStore } = useSelector((state: RootState) => state.auth);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const dispatch = useDispatch();
    /*const navigate = useNavigate();*/
    let form, title;

    if (isDark) {
        form = styles.registrationForm;
        title = styles.title;
    } else {
        form = `${styles.registrationForm} ${styles.registrationFormLight}`;
        title = `${styles.title} ${styles.titleLight}`;
    }

    const handleFieldValidation = (
        field: 'username' | 'email' | 'password',
        localValue: string,
        storedValue: string | null,
        setFieldAction: (value: string | null) => { type: string, payload: string | null }
    ) => {
        if (localValue === storedValue) {
            setError(`Пользователь с таким ${field} уже существует.`);
            return false;
        } else {
            dispatch(setFieldAction(localValue));
            setError(null);
            return true;
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (localPassword !== confirmPassword) {
            setError('Введённые парлои не совпадают');
            return;
        }

        if (!handleFieldValidation('username', localUsername, usernameInStore, setUsername)) return;

        if (!handleFieldValidation('email', localEmail, emailInStore, setEmailInStore)) return;

        if (!handleFieldValidation('password', localPassword, passwordInStore, setPasswordInStore)) return;

        setError(null);

        /*if (localUsername === usernameInStore) {
            setError('Пользователь с таким именем уже существует.');
            return;
        } else {
            dispatch(setUsername(localUsername));
            setError(null);
        }

        if (localEmail === emailInStore) {
            setError('Пользователь с таким email уже существует.');
            return;
        } else {
            dispatch(setEmailInStore(localEmail));
            setError(null);
        }

        if (localPassword === passwordInStore) {
            setError('Пользователь с таким паролем уже существует.');
            return;
        } else {
            dispatch(setPasswordInStore(localPassword));
            setError(null);
        }*/
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

            <Button type="submit" className={styles.btnRegister}>Sign Up</Button>

            <p className={styles.basement}>
                Already have an account?
                <Link to="/" className={styles.signLink}>Sign In</Link>
            </p>
        </form>
    );
};

export { RegistrationForm };
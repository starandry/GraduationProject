import React, { FC, useCallback } from 'react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registrationForm.module.scss';
import { useDispatch } from 'react-redux';
import { setSuccessMessage } from '../../model/authSlice';
import { useThemeStyles } from '@entities/theme/lib/useThemeStyles.ts';
import { useToast } from '@entities/notification/lib/useToast.ts';
import { AuthService } from '@shared/lib/authService.ts';
import { useForm } from '@shared/lib/useForm.ts';

const RegistrationForm: FC = () => {
    const { values, handleChange } = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getThemeClass = useThemeStyles(styles);
    const toast = useToast();

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (values.password !== values.confirmPassword) {
            toast.error('Пароли не совпадают.');
            return;
        }

        if (!AuthService.validateEmail(values.email)) {
            toast.error('Неверный формат email.');
            return;
        }

        if (!AuthService.validatePassword(values.password)) {
            toast.error(
                'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.'
            );
            return;
        }

        const field = AuthService.checkUsernameOrEmailExists(values.username, values.email);

        if (field) {
            toast.error(`Пользователь с таким ${field} уже существует.`);
            return;
        }

        await AuthService.registerUser(values.username, values.email, values.password);
        dispatch(setSuccessMessage('Вы успешно зарегистрированы в системе!'));
        navigate('/auth');
    }, [values, toast, dispatch, navigate]);

    return (
        <form onSubmit={handleSubmit} className={getThemeClass('registrationForm')}>
            <h2 className={getThemeClass('title')}>Sign Up</h2>

            <Input
                type="text"
                className={styles.inputUsername}
                id="username"
                label="Username"
                value={values.username}
                onChange={handleChange('username')}
                placeholder="Your username"
                required
            />

            <Input
                type="email"
                className={styles.inputEmail}
                id="email"
                label="Email"
                value={values.email}
                onChange={handleChange('email')}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                className={styles.inputPassword}
                id="password"
                label="Password"
                value={values.password}
                onChange={handleChange('password')}
                placeholder="Your password"
                required
            />

            <Input
                type="password"
                className={styles.inputConfirmPassword}
                id="confirmPassword"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
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

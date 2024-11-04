import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link } from 'react-router-dom';
import styles from './loginForm.module.scss';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
    onToggleForm: () => void;
    onForgotPassword: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ onLogin, onToggleForm, onForgotPassword  }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2 className={styles.title}>Sign In</h2>

            <Input
                type="email"
                id="log-email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                id="log-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="passwordInput"
            />

            <div className={styles.forgotPassword}>
                <Link to="#" onClick={onForgotPassword}>Forgot password?</Link>
            </div>

            <Button type="submit" className="btn-login">Sign in</Button>

            <p className={styles.basement}>
                Don’t have an account?
                <Link to="#" onClick={onToggleForm} className={styles.signupLink}>Sign Up</Link>
            </p>
        </form>
    );
};

export { LoginForm };
import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import styles from './resetPasswordForm.module.scss';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app"; // FirebaseError для обработки ошибок

const ResetPasswordForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (email: string): boolean => {
        // Регулярное выражение для проверки email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const auth = getAuth(); // Экземпляр Firebase Authentication

        // Проверка валидности email
        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const actionCodeSettings = {
                url: `${window.location.origin}/password`, // URL для редиректа
                handleCodeInApp: true, //  вход завершится в приложении
            };

            const qw = await sendPasswordResetEmail(auth, email, actionCodeSettings);
            console.log(qw);
            setMessage('Password reset email sent!');
            setError('');

           /* await sendSignInLinkToEmail(auth, email, actionCodeSettings);*/

            setMessage(
                `You will receive an email ${email} with a link to reset your password!`
            );
            setError(null); // Убираем ошибки

            //  email в локальном хранилище для завершения входа
            window.localStorage.setItem("emailForSignIn", email);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                setError(`Error: ${err.message}`); // сообщение ошибки
            } else {
                setError("An unknown error occurred. Please try again.");
            }
            setMessage(''); // успешное сообщение
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
            <h2 className={styles.title}>Reset Password</h2>

            {message && <p className={styles.success}>{message}</p>}
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

import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import styles from './registrationForm.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import { setAuthenticated, setUsername as setReduxUsername } from '../../../stores/slices/authSlice.ts';
import {RootState} from "../../../stores/store.ts"; // Переименовываем экшен

const RegistrationForm: FC = () => {
    const [localUsername, setLocalUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let form, title;

    if (isDark) {
        form = styles.registrationForm;
        title = styles.title;
    } else {
        form = `${styles.registrationForm} ${styles.registrationFormLight}`;
        title = `${styles.title} ${styles.titleLight}`;
    }

    // Проверка существующего пользователя по email
    const isEmailTaken = async (email: string): Promise<boolean> => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // true, если пользователь с таким email уже существует
    };

    // Проверка существующего пользователя по имени пользователя (username)
    const isUsernameTaken = async (username: string): Promise<boolean> => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // true, если пользователь с таким username уже существует
    };

    // Функция для добавления пользователя в Firestore
    const addUserToFirestore = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                username: localUsername,
                email: email,
                password: password // без хеширования
            });
            console.log("Document written with ID: ", docRef.id);
            setError(null); // Сброс ошибки при успешной регистрации
            return true; // Возвращаем true при успешной регистрации
        } catch (e) {
            console.error("Error adding document: ", e);
            setError("Failed to register. Please try again.");
            return false; // Возвращаем false при ошибке
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка совпадения пароля и подтверждения пароля
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Проверка email
        if (await isEmailTaken(email)) {
            setError("A user with this email already exists.");
            return;
        }

        // Проверка username
        if (await isUsernameTaken(localUsername)) {
            setError("A user with this username already exists.");
            return;
        }

        // Сохранение данных в Firebase
        const success = await addUserToFirestore();

        if (success) {
            setError(null); // Убираем ошибки при успешной регистрации
            dispatch(setAuthenticated(true));
            dispatch(setReduxUsername(localUsername)); // Используем экшен setUsername для Redux
            navigate("/");
        }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                className={styles.inputPassword}
                id="password"
                label="Password"
                value={password}
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
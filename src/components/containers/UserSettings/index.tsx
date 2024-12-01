import React, { useState } from 'react';
import styles from './userSettings.module.scss';
import {SubTitle} from "../../UI/SubTitle";
import {Input} from "../../UI/Input";
import {Wrapper} from "../Wrapper";
import {Button} from "../../UI/Button";
import Switch from 'react-switch';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import {setDarkMode} from "../../../stores/slices/themeSlice.ts";
import {Spacer} from "../../UI/Spacer";
import { setEmailInStore } from '../../../stores/slices/authSlice.ts';
import { useNavigate } from 'react-router-dom';
import {EMAILREGEX, PASSWORDREGEX} from "../../../constants/AuthConstants.ts";

const UserSettings: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('Artem Lapitsky');
    const [email, setEmail] = useState('a.lapitsky@gmail.com');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string>('');
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const emailInStore = useSelector((state: RootState) => state.auth.emailInStore);
    const navigate = useNavigate();
    let compWrProfile, compTitleProfile, compWrapPassword, compWrapColor, compCancelButton,
    compLabelUseSet, compInputName, compInputPassword;


    const handleChange = (checked: boolean) => {
        dispatch(setDarkMode(checked)); // переключение темы
    };

    if (isDark) {
        compWrProfile = styles.wrapProfile;
        compTitleProfile = styles.titleProfile;
        compWrapPassword = styles.wrapPassword;
        compWrapColor = styles.wrapColor;
        compCancelButton = styles.cancelButton;
        compLabelUseSet = styles.labelUsSet;
        compInputName = styles.inputName;
        compInputPassword = styles.inputPassword;
    } else {
        compWrProfile = `${styles.wrapProfile} ${styles.lightWrapProfile}`;
        compTitleProfile = `${styles.titleProfile} ${styles.lightTitleProfile}`;
        compWrapPassword = `${styles.wrapPassword} ${styles.lightWrapPassword}`;
        compWrapColor = `${styles.wrapColor} ${styles.lightWrapColor}`;
        compCancelButton = `${styles.cancelButton} ${styles.lightCancelButton}`;
        compLabelUseSet = `${styles.labelUsSet} ${styles.lightLabelUsSet}`;
        compInputName = `${styles.inputName} ${styles.lightInputName}`;
        compInputPassword = `${styles.inputPassword} ${styles.lightInputPassword}`;
    }

    const users = JSON.parse(localStorage.getItem('users'));

    const checkPasswordByEmail = (email: string, password: string): boolean => {
        // Ищем пользователя по email
        const user = users.find((user: { email: string }) => user.email === email);

        // Если пользователь найден и пароли совпадают
        return user && user.password === password;
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();

        // Проверка на корректность email
        if (!EMAILREGEX.test(email)) {
            setError('Неверный формат email.');
            return;
        }

        // Проверка на совпадение текущего пароля с паролем в local st
        if (!checkPasswordByEmail(emailInStore, password)) {
            setError('Неверный текущий пароль.');
            return;
        }

        // Проверка на совпадение нового пароля и подтверждения пароля
        if (newPassword !== confirmPassword) {
            setError('Пароли не совпадают.');
            return;
        }

        // Проверка сложности нового пароля
        if (!PASSWORDREGEX.test(newPassword)) {
            setError('Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.');
            return;
        }

        // индекс текущего пользователя по email
        const userIndex = users.findIndex((user: { email: string }) => user.email === emailInStore);

        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex], // остальные данные
                email: email,         // обновляем email
                password: newPassword, // обновляем пароль
                username: name,        // обновляем username
            };

            // Сохраняем обновленный список пользователей в localStorage
            localStorage.setItem('users', JSON.stringify(users));
        }

        dispatch(setEmailInStore(email));

        navigate('/');
    };

    return (
        <>
            <form className={styles.profileSettings} onSubmit={handleSave}>
                <Wrapper className={styles.section}>
                    <SubTitle text={'Profile'} className={compTitleProfile}/>
                    <Wrapper className={compWrProfile}>
                        <Input type={'text'}
                               label={'Name'}
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder={'Name'}
                               className={compInputName}
                               labelClassName={compLabelUseSet}
                               containerClassName={styles.inputGroup}/>
                        <Input type={'email'}
                               label={'Email'}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder={'Email'}
                               className={compInputName}
                               labelClassName={compLabelUseSet}
                               containerClassName={styles.inputGroup}/>
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.section}>
                    <SubTitle text={'Password'} className={compTitleProfile}/>
                    <Wrapper className={compWrapPassword}>
                        <Input type={'password'}
                               label={'Password'}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder={'Your password'}
                               className={compInputPassword}
                               labelClassName={compLabelUseSet}
                               containerClassName={styles.inputGroup}/>
                        <Input type={'password'}
                               label={'New password'}
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                               placeholder={'New password'}
                               className={compInputPassword}
                               labelClassName={compLabelUseSet}
                               containerClassName={styles.inputGroup}/>
                        <Input type={'password'}
                               label={'Confirm password'}
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               placeholder={'Confirm password'}
                               className={compInputPassword}
                               labelClassName={compLabelUseSet}
                               containerClassName={styles.inputConfirmPassword}/>
                        {error && <div className={styles.errorMessage}>{error}</div>}
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.sectionTheme}>
                    <SubTitle text={'Color mode'} className={compTitleProfile}/>
                    <Wrapper className={compWrapColor}>
                        <Wrapper className={styles.wrapTheme}>
                            <label className={compLabelUseSet}>Dark</label>
                            <span>Use dark theme</span>
                        </Wrapper>
                        <Switch
                            onChange={handleChange}      // Функция для обработки изменений
                            checked={isDark}             // Указывает текущее состояние (вкл/выкл)
                            offColor="#46494C"           // Цвет переключателя в выключенном состоянии
                            onColor="#7B61FF"            // Цвет переключателя в включенном состоянии
                            checkedIcon={false}          // Отключает иконку при включенном состоянии
                            uncheckedIcon={false}        // Отключает иконку при выключенном состоянии
                        />
                    </Wrapper>
                    <Wrapper className={styles.buttonGroup}>
                        <Button type={'button'}
                                onClick={handleCancel}
                                className={compCancelButton}>Cancel</Button>
                        <Button type={'submit'} className={styles.saveButton}>Save</Button>
                    </Wrapper>
                </Wrapper>
            </form>
            <Spacer className={styles.spacer}/>
        </>
    );
};

export default UserSettings;

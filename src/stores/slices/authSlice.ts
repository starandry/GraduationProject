import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    isAuthenticated: boolean; // Переменная для хранения статуса аутентификации
    successMessage: string;
    usernameInStore: string | null;
    emailInStore: string | null;
    passwordInStore: string | null;
};

const initialState: AuthState = {
    isAuthenticated: false, // Изначальное состояние: пользователь не аутентифицирован
    successMessage: '',
    usernameInStore: null,
    emailInStore: null,
    passwordInStore: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Экшен для установки isAuthenticated = true (вход в систему)
        login: (state) => {
            state.isAuthenticated = true;
        },
        // Экшен для установки isAuthenticated = false (выход из системы)
        logout: (state) => {
            state.isAuthenticated = false;
        },
        // Экшен для произвольного изменения состояния
        setAuthenticated: (state, action: { payload: boolean }) => {
            state.isAuthenticated = action.payload;
        },
        // Экшен для установки сообщения об успешной смене пароля
        setSuccessMessage: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        // Экшен для очистки сообщения
        clearSuccessMessage: (state) => {
            state.successMessage = '';
        },
        // Экшен для установки имени пользователя
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.usernameInStore = action.payload;
        },
        setEmailInStore: (state, action: PayloadAction<string | null>) => {
            state.emailInStore = action.payload;
        },
        setPasswordInStore: (state, action: PayloadAction<string | null>) => {
            state.passwordInStore = action.payload;
        },
    },
});

export const {
    login,
    logout,
    setAuthenticated,
    setSuccessMessage,
    clearSuccessMessage,
    setUsername,
    setEmailInStore,
    setPasswordInStore,
} = authSlice.actions;

export default authSlice.reducer;

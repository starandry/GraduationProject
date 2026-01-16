import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    isAuthenticated: boolean; // Переменная для хранения статуса аутентификации
    successMessage: string;
    emailInStore: string | null;
};

const initialState: AuthState = {
    isAuthenticated: false, // Изначальное состояние: пользователь не аутентифицирован
    successMessage: '',
    emailInStore: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
        setEmailInStore: (state, action: PayloadAction<string | null>) => {
            state.emailInStore = action.payload;
        },
    },
});

export const {
    logout,
    setAuthenticated,
    setSuccessMessage,
    clearSuccessMessage,
    setEmailInStore,
} = authSlice.actions;

export default authSlice.reducer;

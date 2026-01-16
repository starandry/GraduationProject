import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
    isDark: boolean;
};

const initialState: ThemeState = {
    isDark: true,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDark = action.payload;
        },
    },
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
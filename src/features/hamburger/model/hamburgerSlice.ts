import { createSlice } from '@reduxjs/toolkit';

type HamburgerState = {
    isOpen: boolean;
};

const initialState: HamburgerState = {
    isOpen: false,
};

const hamburgerSlice = createSlice({
    name: 'hamburger',
    initialState,
    reducers: {
        toggleMenu(state) {
            state.isOpen = !state.isOpen;
        },
        closeMenu(state) {
            state.isOpen = false;
        },
    },
});

export const { toggleMenu, closeMenu } = hamburgerSlice.actions;
export default hamburgerSlice.reducer;

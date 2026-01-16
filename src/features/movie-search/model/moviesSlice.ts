import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        page: 1,
        search: false,
        searchQuery: '',
    },
    reducers: {
        incrementPage(state) {
            state.page += 1;
        },
        setSearchTrue(state) {
            state.search = true;
        },
        setSearchFalse(state) {
            state.search = false;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
});

export const { incrementPage, setSearchTrue, setSearchFalse, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;

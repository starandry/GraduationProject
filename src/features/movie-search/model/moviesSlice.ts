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
        setSearch(state, action: PayloadAction<boolean>) {
            state.search = action.payload;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
});

export const { incrementPage, setSearch, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;

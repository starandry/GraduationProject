import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './types';

//определение типа FavouritesState как массива объектов типа Movie
type FavouritesState = Movie[];

//инициализция initialState (начального  состояния) пустым массивом типа FavouritesState кот определён  строкой выше
const initialState: FavouritesState = [];

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleFavourite(state, action: PayloadAction<Movie>) {
            const movie = action.payload;
            const idx = state.findIndex((fav) => fav.imdbID === movie.imdbID);
            if (idx >= 0) {
                state.splice(idx, 1);
            } else {
                state.push(movie);
            }
        },
    },
});

export const selectFavourites = (state: { favourites: Movie[] }) => state.favourites;
export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;

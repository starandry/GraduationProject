import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';
import { RootState } from '../store.ts';

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
            const existingIndex = state.findIndex((fav) => fav.imdbID === movie.imdbID);

            if (existingIndex >= 0) {
                // Если фильм есть, удалить его
                for (let i = state.length - 1; i >= 0; i -= 1) {
                    if (state[i].imdbID === movie.imdbID) {
                        state.splice(i, 1);
                    }
                }
            } else {
                // Если фильма нет, добавить его
                state.push(movie);
            }
        },
    },
});

export const selectFavourites = (state: RootState) => state.favourites;
export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;

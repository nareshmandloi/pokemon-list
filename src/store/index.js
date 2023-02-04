import { configureStore, } from '@reduxjs/toolkit';
import pokemonReducer from './reducer/pokemonSlice';

const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    }
})


export default store;
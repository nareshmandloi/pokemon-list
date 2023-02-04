import { combineReducers, createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonList:[],
    isOpen: false,
  },
  reducers: {
    pokemonList: (state, action) => {
      state.pokemonList.push(action.payload);
    },
    openModal:(state, action) => {
        state.isOpen  = action.payload
    }
  },
});

export const { pokemonList, openModal, increment } = pokemonSlice.actions;
export default pokemonSlice.reducer;



import { combineReducers, createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "list",
  initialState: [],
  reducers: {
    pokemonList: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { pokemonList } = pokemonSlice.actions;

export const rootReducer = combineReducers({
    list: pokemonSlice.reducer,
});

export default rootReducer;



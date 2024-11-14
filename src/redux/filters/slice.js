import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  name: "",
};

//слайс фабрика(чорнетка)
export const filterSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,
  reducers: {
    setFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

//Згенерували фабрику reducer(цех)
export const filterReducer = filterSlice.reducer;

//Згенерували ф-цію команди
export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;

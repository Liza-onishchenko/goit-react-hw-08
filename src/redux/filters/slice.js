import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectorContacts } from "../contacts/selectors";
import { selectorFilter } from "./selectors";

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

//мемоізований селектор
export const selectFilteredContacts = createSelector(
  [selectorContacts, selectorFilter],
  (contacts, filter) => {
    if (!filter) return contacts;
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
        contact.number.includes(filter.trim())
    );
  }
);

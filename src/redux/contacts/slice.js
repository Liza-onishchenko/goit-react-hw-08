import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null,
};

//слайс фабрика(чорнетка)
export const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //зовнішні редюсери. опрацьовуємо 3 методи
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

//Згенерували фабрику reducer(цех) підєднати до стору
export const contactsReducer = contactsSlice.reducer;
// Контакти можна редагувати, бекенд підтримує PATCH-запит для оновлення контакту.
// треба кнопка щоб відкривала вікно - нову форму в яку вводити нову інформацію про користувача і під часу сабміту цієї форми взяти айді користувача, контакта, нову назву яку ввів користувач ,новиц номер кинути його в операцію
// Операція підставля айді контакту. Передати обєкт з новою назвою і новим телефоном. При натискані на контакт має відкриватись нова форма . В цій формі редагуємо і під час сабміту форми зробити діспатч операції на редагування в неї передати обєкт с айді контакту,імя нове та телефон
// Коли ця інфрм потрапить далі айді  підставити в /contacts/{contactId} а нове імя номер кинути в баді запиту  та додати голіку редагування

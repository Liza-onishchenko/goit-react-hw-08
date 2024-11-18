import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const INITIAL_STATE = {
  user: { name: null, email: null }, //зберігає інформацію про користувача
  token: null, //використовуватиметься для запитів до API для доступу до приватних дани
  isLoggedIn: false, // відстежувати, чи користувач увійшов в систему
  isRefreshing: false, // для логіки для оновлення токенів
  isLoading: false,
  error: null,
};

//слайс фабрика(чорнетка)
export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //зовнішні редюсери. опрацьовуємо 3 методи
    builder

      //обробник регістрації
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true; //авторизована
        state.user = action.payload.user; //зберігаємо інформ про користувача
        state.token = action.payload.token; //зберігаємо токен
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // //обробник для логіну
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // //виход з додатка
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // //оновлення користувача за токеном
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

//Згенерували фабрику reducer(цех) підєднати до стору
export const authReducer = authSlice.reducer;

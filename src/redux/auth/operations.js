import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const autInstance = axios.create({
  baseURL: "https://connections-api.goit.global/",
  //   headers: {
  //     "Authorization" : "Bearer [token]"
  //   }
});

// Динамічна ф-ця для для підставки токена

export const setToken = (token) => {
  autInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Очищення токена

export const clearToken = () => {
  autInstance.defaults.headers.common.Authorization = "";
};

//Санки, опрацьовувати мережеві запити

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    // {formData "name", "email", "password""}
    try {
      const response = await autInstance.post("/users/signup", formData);
      // "user": {"name": "John Taco","email": "1231241sadwda213wd@gmail.com"},"token": "" }
      setToken(response.data.token); // Збереження токена після успішної реєстрації
      console.log("response.data: ", response.data);
      console.log("formData:", formData);
      return response.data; // Повернення даних користувача та токенa
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    //formData {"email": "string","password": "string"}
    try {
      const response = await autInstance.post("/users/login", formData);
      // "user": {"name": "John Taco","email": "1231241sadwda213wd@gmail.com"},"token": ""}
      setToken(response.data.token);
      console.log("response.data: ", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await autInstance.post("/users/logout");
    clearToken(); //очистка токена
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//автоматизація токену(збереження статусу авторизації користувача)
export const refreshUser = createAsyncThunk(
  "auth/getCurentUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState(); //доступ до стейту додатка
    const token = state.auth.token; //доступ до токену

    if (!token) {
      //якщо токена немає
      return thunkAPI.rejectWithValue("No token provided to refresh user data");
    }

    try {
      setToken(token);
      const response = await autInstance.get("/users/current");
      console.log("response.data: ", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

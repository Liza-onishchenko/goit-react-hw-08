import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    try {
      const response = await autInstance.post("/users/signup", formData);
      setToken(response.data.token); // Збереження токена після успішної реєстрації

      if (response.status === 201) {
        toast.success("User created.");
      }
      return response.data; // Повернення даних користувача та токенa
    } catch (error) {
      const errorMessage = error.response
        ? error.response.status === 400
          ? "User creation error." // Помилка при створенні користувача
          : error.response.status === 500
          ? "Server error." // Серверна помилка
          : "An unknown error occurred."
        : "Network error. Please try again later."; // Помилка мережі

      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await autInstance.post("/users/login", formData);
      if (response.status === 200) {
        setToken(response.data.token);
        toast.success("User is logged in."); // Це має викликатися після того, як токен збережений
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.status === 400
          ? "Login error." // Помилка при логіні
          : "An unknown error occurred."
        : "Network error. Please try again later."; // Помилка мережі

      toast.error(errorMessage);
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

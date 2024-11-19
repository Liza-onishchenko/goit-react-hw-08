import css from "./App/App.module.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route, Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Suspense, lazy, useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
const HomePage = lazy(() => import("./page/HomePage/HomePage"));
const ContactsPage = lazy(() => import("./page/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("./page/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("./page/RegistrationPage/RegistrationPage")
);
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff9800", // основний колір для кнопок, фону тощо
    },
    secondary: {
      main: "#2196f3", // другий колір
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Обгортаємо весь додаток у ThemeProvider */}
      <div>
        {isRefreshing ? (
          <b>Refreshing user...</b>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route
                  path="/register"
                  element={
                    <RestrictedRoute //спеціальний компонент, який перевіряє, чи авторизований користувач.
                      redirectTo="/contacts" //Авторизований - вказує, куди перенаправляти користувача,
                      component={<RegistrationPage />} //не авторизований-отримає доступ до сторінки реєстрації
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <RestrictedRoute
                      redirectTo="/contacts"
                      component={<LoginPage />}
                    />
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute
                      redirectTo="/login"
                      component={<ContactsPage />}
                    /> // Використовується для приватних маршрутів,де доступ дозволений лише авторизованим користувачам.
                  } // Якщо користувач не авторизований, його буде перенаправлено на сторінку логіну.
                />
              </Route>
            </Routes>
          </Suspense>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

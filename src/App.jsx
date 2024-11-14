import css from "./App/App.module.css";
import { Routes, Route, Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";

import Layout from "./components/Layout/Layout";
import HomePage from "./page/HomePage/HomePage";
import ContactsPage from "./page/ContactsPage/ContactsPage";
import LoginPage from "./page/LoginPage/LoginPage";
import RegistrationPage from "./page/RegistrationPage/RegistrationPage";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
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
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} /> // Використовується для приватних маршрутів,де доступ дозволений лише авторизованим користувачам.
          } // Якщо користувач не авторизований, його буде перенаправлено на сторінку логіну.
        />
      </Route>
    </Routes>
  );
}

export default App;

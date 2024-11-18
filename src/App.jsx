import css from "./App/App.module.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route, Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Suspense, lazy, useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";

const HomePage = lazy(() => import("./page/HomePage/HomePage"));
const ContactsPage = lazy(() => import("./page/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("./page/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("./page/RegistrationPage/RegistrationPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
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
  );
}

export default App;

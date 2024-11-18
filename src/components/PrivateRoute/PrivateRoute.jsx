import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

//ком-нт який треьа відображати component,redirectTo куди переадресовувати неавторизованого користувача
export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return isRefreshing ? (
    <LoadingSpinner />
  ) : isLoggedIn ? (
    Component
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

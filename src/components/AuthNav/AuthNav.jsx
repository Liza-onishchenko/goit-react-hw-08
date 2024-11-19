import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

//навігаційне меню для неавторизованих користувачів.
const AuthNav = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/register" className={css.link}>
        Register
      </NavLink>
      <NavLink to="login" className={css.link}>
        Log In
      </NavLink>
    </nav>
  );
};

export default AuthNav;

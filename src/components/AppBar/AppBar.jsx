import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AppBar.module.css";

//AppBar рендерить навігацію для всіх користувачів,
//перемикається між AuthNav (для неавторизованих користувачів) і UserMenu (для авторизованих користувачів).
const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // перевіряємо, чи користувач авторизований

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;

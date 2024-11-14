import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";

//AppBar рендерить навігацію для всіх користувачів,
//перемикається між AuthNav (для неавторизованих користувачів) і UserMenu (для авторизованих користувачів).
const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // перевіряємо, чи користувач авторизований
  console.log("isLoggedIn: ", isLoggedIn);
  return (
    <nav>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </nav>
  );
};

export default AppBar;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";

//UserMenu відповідає за відображення меню для авторизованого користувача.
const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //вихід
  const onLogout = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;

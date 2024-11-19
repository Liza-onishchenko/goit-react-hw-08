import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { Button } from "@mui/material";
import css from "./UserMenu.module.css";

//UserMenu відповідає за відображення меню для авторизованого користувача.
const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //вихід
  const onLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.userMenu}>
      <p className={css.userMenuP}>Welcome, {user.name}</p>
      <Button
        variant="outlined"
        color="primary"
        onClick={onLogout}
        className={css.buttonUser}
        size="small"
        fullWidth
        sx={{
          backgroundColor: "#ffffff",
          color: "#ff9800",
          padding: "5px 10px",
          fontSize: "12px",
          fontWeight: "600",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s",
          "&:hover": {
            backgroundColor: "#160a5a",
            color: "#ff9800",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          },
          "&:active": {
            backgroundColor: "#12083a",
            color: "#ff9800",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;

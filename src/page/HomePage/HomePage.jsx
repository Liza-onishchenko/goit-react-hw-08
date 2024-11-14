import React from "react";
import css from "./HomePage.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const HomePage = () => {
  const user = useSelector(selectUser);

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        {user && user.name
          ? `Hello!, ${user.name}! All your important contacts are now in your pocket. Easy to store, easy to find!`
          : "Hello! All your important contacts are now in your pocket. Easy to store, easy to find!"}
      </h1>
    </div>
  );
};

export default HomePage;

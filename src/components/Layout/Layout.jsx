import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;

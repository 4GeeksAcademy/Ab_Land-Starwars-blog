import { Outlet } from "react-router-dom/dist";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import { SideBar } from "../components/SideBar";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const Layout = () => {
  const { store } = useGlobalReducer();

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", store.theme);
  }, [store.theme]);

  return (
    <ScrollToTop>
      <Navbar />
      <div className="bd-layout">
        <div
          className="d-flex flex-column p-3 border-end pt-5 d-none d-lg-flex"
          style={{
            width: "250px",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <nav className="navbar p-3"></nav>
          <SideBar />
        </div>
        <div className="content-area container-fluid">
          <nav className="navbar p-3"></nav>
          <Outlet />
        </div>
      </div>
    </ScrollToTop>
  );
};

import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../services/userManager";
import { AnyAction, Dispatch } from "redux";
import { NavItem } from "../types";
import Error from "../components/Error";
import RequireAuth from "../components/RequireAuth";

const LazyHome = React.lazy(() => import("./Home"));
const LazyLogin = React.lazy(() => import("./Login"));
const LazyAuthMediator = React.lazy(() => import("./AuthMediator"));

const errorPageStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 10000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "black",
  color: "white",
};

export const navItems: NavItem[] = [
  {
    path: "/",
    label: "home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHome />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/login",
    label: "login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLogin />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/googleauth",
    label: "authmediator",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAuthMediator />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
];

const Navigation: React.FC = () => {
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData(dispatch, navigate);
  }, [localStorage.getItem("token"), dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        {navItems
          .filter((item) => !item.protected)
          .map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={item.element}
              errorElement={item.errorElement}
            />
          ))}
        <Route element={<RequireAuth />}>
          {navItems
            .filter((ele) => ele.protected)
            .map((ele, i) => (
              <Route key={i} element={ele.element} path={ele.path} />
            ))}
        </Route>

        <Route
          path="*"
          element={
            <div style={errorPageStyle}>
              <h1>Error! Page not found</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default Navigation;

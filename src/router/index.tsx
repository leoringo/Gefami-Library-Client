import {
  createBrowserRouter,
  redirect,
  type RouteObject,
} from "react-router-dom";

import { lazy } from "react";

const App = lazy(() => import("../App"));
const Login = lazy(() => import("../views/login"));
const HomePage = lazy(() => import("../views/home"));

const isAdmin = () => localStorage.getItem("role");

const protectedRoutes = (): RouteObject[] => {
  const children: RouteObject[] = [
    {
      path: "/",
      handle: { label: "Home" },
      element: <HomePage />,
    },
  ];

  if (isAdmin()) {
    // !! -- For Admin Purposes
    children.push(
      {
        path: "/dummy",
        handle: { label: "Dummy" },
        element: <></>,
      },
      {}
    );
  }

  return [
    {
      element: <App />,
      loader: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return redirect("/login");
        }
        return null;
      },
      children,
    },
  ];
};

export const route: RouteObject[] = [
  { ...protectedRoutes },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      const token = localStorage.token;
      if (token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },
];

export default createBrowserRouter(route);

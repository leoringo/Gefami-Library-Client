import {
  createBrowserRouter,
  redirect,
  type RouteObject,
} from "react-router-dom";

import { lazy } from "react";

const App = lazy(() => import("../App"));
const Login = lazy(() => import("../views/login"));
const HomePage = lazy(() => import("../views/home"));
const LoanPage = lazy(() => import("../views/loanList"))

export const route: RouteObject[] = [
  {
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        handle: { label: "Home" },
        element: <HomePage />,
      },
      {
        path: "/loan/list",
        handle: { label: "Loan" },
        element: <LoanPage />,
        loader: async() => {
          const role = localStorage.getItem("role")
          if(role !== 'admin') {
            return redirect("/")
          }
        }
      },
    ],
  },
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

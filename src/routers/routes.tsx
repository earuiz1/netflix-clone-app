import React from "react";
import RootLayout from "../pages/RootLayout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import AccountPage from "../pages/Account";
import ProtectedRoute from "./ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    //errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signUp",
        element: <SignUpPage />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

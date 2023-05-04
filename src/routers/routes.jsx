import RootLayout from "../pages/RootLayout";
import HomePage from "../pages/Home";

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
    ],
  },
];

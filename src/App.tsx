import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/routes";
import Modal from "./components/UI/Modal";
import { useAppSelector } from "./redux/store";
import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";

const router = createHashRouter(routes);

const App = () => {
  const isOpen = useAppSelector((state) => state.isOpen);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isOpen && <Modal />}
      <RouterProvider router={router} />;
    </>
  );
};

export default App;

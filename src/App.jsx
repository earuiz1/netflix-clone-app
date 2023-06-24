import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/routes";
import Modal from "./components/UI/Modal";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";

const router = createHashRouter(routes);

const App = () => {
  const isOpen = useSelector((state) => state.isOpen);
  const [isLoading, setIsLoading] = useState(true);
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

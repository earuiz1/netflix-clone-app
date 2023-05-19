import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/routes";
import Modal from "./components/UI/Modal";
import { useSelector } from "react-redux";

const router = createHashRouter(routes);

const App = () => {
  const isOpen = useSelector((state) => state.isOpen);
  return (
    <>
      {isOpen && <Modal />}
      <RouterProvider router={router} />;
    </>
  );
};

export default App;

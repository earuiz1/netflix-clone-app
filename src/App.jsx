import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/routes";
import { ModalProvider } from "./context/ModalContext";

const router = createHashRouter(routes);

const App = () => {
  return (
    <ModalProvider>
      <RouterProvider router={router} />;
    </ModalProvider>
  );
};

export default App;

import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/routes";

const router = createHashRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

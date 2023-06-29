import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);

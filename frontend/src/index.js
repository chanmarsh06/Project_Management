import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// icon
import "bootstrap-icons/font/bootstrap-icons.css";
// Provider
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App/> */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import App from "./App";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 4000,
  position: positions.TOP_CENTER,
  transition: transitions.FADE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./redux/configure-store";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

const store = configureStore();

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
const root = document.getElementById("root");

ReactDOM.render(app, root);

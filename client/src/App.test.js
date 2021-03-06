import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./redux/configure-store";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = configureStore();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

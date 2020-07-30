import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

/**
 * configures redux-store depending on environment
 */
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store =
    process.env.NODE_ENV === "production"
      ? configureProductionStore(sagaMiddleware)
      : configureDevStore(sagaMiddleware);

  sagaMiddleware.run(rootSaga);

  return store;
};

/**
 * Production store configuration
 */
const configureProductionStore = (sagaMiddleware) => {
  console.log("configure production store");

  return createStore(rootReducer, applyMiddleware(sagaMiddleware));
};

/**
 * Development store configuration
 */
const configureDevStore = (sagaMiddleware) => {
  console.log("configure dev store");

  const logger = createLogger({
    collapsed: true,
    diff: true,
    duration: true,
    timestamp: true,
  });

  return createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));
};

export default configureStore;

import { compose, applyMiddleware, Store, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import slices from "./slices";
import sagas from "./sagas";

export type StoreState = ReturnType<typeof slices>;

const middlewares: Middleware[] = [];

const sagaMiddleware = createSagaMiddleware();

const composer =
  process.env.NODE_ENV === "development"
    ? // eslint-disable-next-line no-console
      compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
    : compose(applyMiddleware(...middlewares));

const store: Store<StoreState> = configureStore({
  reducer: slices,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(sagaMiddleware).prepend(middlewares),
  enhancers: [composer],
});

sagaMiddleware.run(sagas);

export default store;

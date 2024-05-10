import { Action, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./api";
import { useDispatch, useStore } from "react-redux";

export const createStore = (preloadedState?: ReturnType<typeof reducer>) => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });

  if (import.meta.env.DEV && import.meta.hot) {
    import.meta.hot.accept("./reducer.ts", () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"] &
  ThunkDispatch<RootState, void, Action>;

export const useAppStore = useStore.withTypes<AppStore>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

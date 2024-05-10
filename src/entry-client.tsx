import { createAction } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "~/App";
import { ProviderWrapper } from "~/Providers";
import { createStore } from "~/lib/redux/store";
import { HYDRATE } from "~/lib/redux/api";

const serializedStoreData = document.getElementById("__STORE_DATA__");

const store = createStore();
if (serializedStoreData) {
  const hydrate = createAction<string>(HYDRATE);
  const storeData = JSON.parse(serializedStoreData.innerHTML);
  store.dispatch(hydrate(storeData));
}

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <ProviderWrapper store={store}>
      <App />
    </ProviderWrapper>
  </React.StrictMode>,
);

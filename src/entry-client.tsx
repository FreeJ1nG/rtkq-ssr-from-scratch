import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "~/App";
import { ProviderWrapper } from "~/Providers";
import { createStore } from "~/lib/redux/store";

const serializedStoreData = document.getElementById("__STORE_DATA__");
const preloadedState = serializedStoreData?.innerHTML
  ? JSON.parse(serializedStoreData?.innerHTML)
  : undefined;

const store = createStore(preloadedState);

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <ProviderWrapper store={store}>
      <App />
    </ProviderWrapper>
  </React.StrictMode>,
);

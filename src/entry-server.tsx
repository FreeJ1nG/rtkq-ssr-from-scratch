import React from "react";
import { App } from "~/App";
import ReactDomServer from "react-dom/server";
import { pokemonApi } from "~/features/pokemon/api";
import { createStore } from "~/lib/redux/store";
import { ProviderWrapper } from "~/Providers";

export async function render() {
  const store = createStore();
  await store.dispatch(
    pokemonApi.endpoints.getPokemons.initiate({ limit: 20, offset: 0 }),
  );
  const appHtml = ReactDomServer.renderToString(
    <React.StrictMode>
      <ProviderWrapper store={store}>
        <App />
      </ProviderWrapper>
    </React.StrictMode>,
  );
  const serializedStoreData = JSON.stringify(store.getState());
  return { appHtml, serializedStoreData };
}

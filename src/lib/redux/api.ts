import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const HYDRATE = "__REDUX_STORE_HYDRATE__";

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2",
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Pokemon"],
  endpoints: () => ({}),
});

export default api;

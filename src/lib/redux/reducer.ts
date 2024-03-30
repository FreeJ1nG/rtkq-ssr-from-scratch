import { combineReducers } from "@reduxjs/toolkit";
import api from "./api";

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export default reducer;

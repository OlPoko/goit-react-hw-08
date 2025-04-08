import { configureStore } from "@reduxjs/toolkit";
import contactsSliceReducer from "./contacts/contactsSlice";
import filterSliceReducer from "./contacts/filtersSlice";
import authReducer from "./auth/slice";

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    filters: filterSliceReducer,
    auth: authReducer,
  },
});

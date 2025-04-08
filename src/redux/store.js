import { configureStore } from "@reduxjs/toolkit";
import contactsSliceReducer from "./contacts/contactsSlice";
import filterSliceReducer from "./contacts/filtersSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    filters: filterSliceReducer,
  },
});

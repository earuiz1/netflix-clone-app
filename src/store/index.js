import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal_slice";

const store = configureStore({
  reducer: modalSlice.reducer,
});

export const modalActions = modalSlice.actions;
export default store;

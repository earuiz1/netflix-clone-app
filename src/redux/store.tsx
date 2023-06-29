import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal_slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: modalSlice.reducer,
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;

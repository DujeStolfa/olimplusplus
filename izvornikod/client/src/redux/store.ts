import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./slices/authSlice";
import dictionariesSlice from "./slices/dictionariesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dictionaries: dictionariesSlice,
  }
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
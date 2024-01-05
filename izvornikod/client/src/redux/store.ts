import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./slices/authSlice";
import dictionariesSlice from "./slices/dictionariesSlice";
import adminSlice from "./slices/adminSlice";
import wordsSlice from "./slices/wordsSlice";
import studentDictionariesSlice from "./slices/studentDictionariesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dictionaries: dictionariesSlice,
    admins: adminSlice,
    words: wordsSlice,
    studentDictionaries: studentDictionariesSlice,
  }
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
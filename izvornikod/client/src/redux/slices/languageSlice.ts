import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import languageService from "../../services/api/routes/languages";
import Language from "../../types/models/Language";

interface LanguagesSlice {
  languages: Language[];
  selectedLanguage: Language | undefined;
}

const initialState: LanguagesSlice = {
  languages: [],
  selectedLanguage: undefined,
}

const fetchLanguages = createAsyncThunk(
  'languages/fetchAll',
  async () => {
    const response = await languageService.getAll();
    return response.data;
  }
);

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setSelectedLanguage: (state, action: PayloadAction<Language>) => {
      state.selectedLanguage = action.payload;
    },
    clearSelectedLanguage: (state) => {
      state.selectedLanguage = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLanguages.fulfilled, (state, action: PayloadAction<Language[]>) => {
      state.languages = action.payload;
    })
  }
});

export const {
  setSelectedLanguage,
  clearSelectedLanguage,
} = languageSlice.actions;

export {
  fetchLanguages,
}

export default languageSlice.reducer;
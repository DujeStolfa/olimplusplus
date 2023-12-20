import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import dictionaryService from "../../services/api/routes/dictionaries";
import Dictionary from "../../types/models/Dictionary";

interface DictionariesState {
  dictionaries: Dictionary[];
}

const initialState: DictionariesState = {
  dictionaries: [],
}

const fetchDictionaries = createAsyncThunk(
  'dictionaries/fetchAll',
  async (languageid: number) => {
    const response = await dictionaryService.getAll(languageid);
    return response.data;
  }
);

const dictionarySlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDictionaries.fulfilled, (state, action: PayloadAction<Dictionary[]>) => {
      state.dictionaries = action.payload;
    });
  }
});

export {
  fetchDictionaries,
}

export default dictionarySlice.reducer;
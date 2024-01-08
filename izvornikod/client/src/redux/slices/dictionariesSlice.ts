import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { remove } from "lodash";

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

const deleteDictionary = createAsyncThunk(
  'dictionaries/delete',
  async (dictionaryid: number) => {
    const response = await dictionaryService.delete(dictionaryid);
    return dictionaryid;
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

    builder.addCase(deleteDictionary.fulfilled, (state, action: PayloadAction<number>) => {
      remove(state.dictionaries, el => el.dictionaryid === action.payload);
    });
  }
});

export {
  fetchDictionaries,
  deleteDictionary,
}

export default dictionarySlice.reducer;
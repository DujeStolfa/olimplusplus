import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex, remove } from "lodash";

import dictionaryService from "../../services/api/routes/dictionaries";
import Dictionary from "../../types/models/Dictionary";
import CRUD_ACTION from "../../types/enums/CrudAction";
import CreateDictionaryInput from "../../types/inputs/dictionary/CreateDictionaryInput";
import RenameDictionaryInput from "../../types/inputs/dictionary/RenameDictionaryInput";
import AddWordsToDictionaryInput from "../../types/inputs/dictionary/AddWordsToDictInput";

interface DictionariesState {
  dictionaries: Dictionary[];
  createFormState: CRUD_ACTION;
  selectedDictionary: Dictionary | undefined;
}

const initialState: DictionariesState = {
  dictionaries: [],
  createFormState: CRUD_ACTION.READ,
  selectedDictionary: undefined,
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

const createDictionary = createAsyncThunk(
  'dictionaries/create',
  async (dictInput: CreateDictionaryInput) => {
    const response = await dictionaryService.create(dictInput);
    return response.data;
  }
);

const renameDictionary = createAsyncThunk(
  'dictionaries/rename',
  async (dictInput: RenameDictionaryInput) => {
    const response = await dictionaryService.rename(dictInput);
    return response.data;
  }
);

const addWordsToDictionary = createAsyncThunk(
  'dictionaries/add-words',
  async (dictInput: AddWordsToDictionaryInput) => {
    const response = await dictionaryService.addWordsToDictIOnary(dictInput);
    return response.data;
  }
);

const dictionarySlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
    setCreateFormState: (state, action: PayloadAction<CRUD_ACTION>) => {
      state.createFormState = action.payload;
    },
    selectDictionary: (state, action: PayloadAction<Dictionary>) => {
      state.selectedDictionary = action.payload;
    },
    clearDictionary: (state) => {
      state.selectedDictionary = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDictionaries.fulfilled, (state, action: PayloadAction<Dictionary[]>) => {
      state.dictionaries = action.payload;
    });

    builder.addCase(deleteDictionary.fulfilled, (state, action: PayloadAction<number>) => {
      remove(state.dictionaries, el => el.dictionaryid === action.payload);
    });

    builder.addCase(createDictionary.fulfilled, (state, action: PayloadAction<Dictionary>) => {
      state.dictionaries.push(action.payload);
    });

    builder.addCase(renameDictionary.fulfilled, (state, action: PayloadAction<Dictionary>) => {
      let idx = findIndex(state.dictionaries, el => el.dictionaryid === action.payload.dictionaryid);
      state.dictionaries[idx] = action.payload;
    });
  }
});

export const {
  setCreateFormState,
  selectDictionary,
  clearDictionary,
} = dictionarySlice.actions;

export {
  fetchDictionaries,
  deleteDictionary,
  createDictionary,
  renameDictionary,
  addWordsToDictionary
}

export default dictionarySlice.reducer;
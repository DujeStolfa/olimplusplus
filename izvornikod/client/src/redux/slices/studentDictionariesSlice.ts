import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import dictionaryService from "../../services/api/routes/dictionaries";
import GetStudentDictionariesInput from "../../types/inputs/dictionary/GetStudentDictionariesInput";
import StudentDictionary from "../../types/models/StudentDictionary";

interface StudentDictionariesState {
  dictionaries: StudentDictionary[];
  selectedDictionary: StudentDictionary | undefined;
}

const initialState: StudentDictionariesState = {
  dictionaries: [],
  selectedDictionary: undefined,
}

const fetchStudentDictionaries = createAsyncThunk(
  'studentDictionaries/fetchAll',
  async (inputData: GetStudentDictionariesInput) => {
    const response = await dictionaryService.getAllStudents(inputData);
    return response.data;
  }
);

const studentDictionariesSlice = createSlice({
  name: "studentDictionaries",
  initialState,
  reducers: {
    setSelectedDictionary: (state, action: PayloadAction<StudentDictionary>) => {
      state.selectedDictionary = action.payload;
    },
    clearSelectedDictionary: (state) => {
      state.selectedDictionary = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudentDictionaries.fulfilled, (state, action: PayloadAction<StudentDictionary[]>) => {
      state.dictionaries = action.payload;
    });
  }
});

export const {
  setSelectedDictionary,
  clearSelectedDictionary,
} = studentDictionariesSlice.actions;

export {
  fetchStudentDictionaries,
}

export default studentDictionariesSlice.reducer;
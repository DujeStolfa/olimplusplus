import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import dictionaryService from "../../services/api/routes/dictionaries";
import GetStudentDictionariesInput from "../../types/inputs/dictionary/GetStudentDictionariesInput";
import StudentDictionary from "../../types/models/StudentDictionary";

interface StudentDictionariesState {
  dictionaries: StudentDictionary[];
}

const initialState: StudentDictionariesState = {
  dictionaries: []
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentDictionaries.fulfilled, (state, action: PayloadAction<StudentDictionary[]>) => {
      state.dictionaries = action.payload;
    });
  }
});

export {
  fetchStudentDictionaries,
}

export default studentDictionariesSlice.reducer;
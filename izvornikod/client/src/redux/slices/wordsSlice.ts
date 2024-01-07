import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import wordService from "../../services/api/routes/words";
import Word from "../../types/models/Word";

interface WordsState {
    words: Word[];
}

const initialState: WordsState = {
    words: [],
}

const fetchWords = createAsyncThunk(
    'words/fetchAll',
    async (languageid: number) => {
        const response = await wordService.getAll(languageid);
        return response.data;
    }
);

const wordSlice = createSlice({
    name: "words",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWords.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.words = action.payload;
        });
    }
});

export {
    fetchWords,
}

export default wordSlice.reducer;


/**
import CreateWordInput from "../../types/inputs/user/CreateWordInput"; 

const createWord = createAsyncThunk(
    'auth/createWordStatus',
    async (data: CreateWordInput) => {
    const response = await usersService.createWord(data, data.languageId);
    return response.data;
    }
);

 */
export { }
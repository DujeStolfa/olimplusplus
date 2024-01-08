import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CreateWordInput from "../../types/inputs/user/CreateWordInput";
import wordService from "../../services/api/routes/words";
import Word from "../../types/models/Word";
import { words } from "lodash";

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

const createWord = createAsyncThunk(
    'auth/createWordStatus',
    async (data: CreateWordInput) => {
    const urlParams = new URLSearchParams(window.location.search);
    const languageId = Number(urlParams.get('languageId'));
    const response = await wordService.createWord(data, languageId);
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
    fetchWords,createWord,
}

export default wordSlice.reducer;




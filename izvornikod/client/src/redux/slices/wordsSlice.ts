import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CreateWordInput from "../../types/inputs/user/CreateWordInput";
import wordService from "../../services/api/routes/words";
import Word from "../../types/models/Word";
import { words } from "lodash";

interface WordsState {
    words: Word[];
    wordsNotInDictionary: Word[];   // za dodavanje rijeci u rjecnik prvo treba uzeti sve rijeci koje nisu u rjecniku
    wordsToBeAdded: Word[];         // odabrane rijeci idu u ovaj array
    dictionaryWords:Word[]; //Moguci problem down the line oko tipa, ako bude problema, tu pogledati
}

const initialState: WordsState = {
    words: [],
    wordsNotInDictionary: [],
    wordsToBeAdded: [],
    dictionaryWords: []
}

const fetchWords = createAsyncThunk(
    'words/fetchAll',
    async (languageid: number) => {
        const response = await wordService.getAll(languageid);
        return response.data;
    }
);

const fetchWordsNotInDictionary = createAsyncThunk(
    'words/fetchNotInDictionary',
    async ( dictionaryid: number) => {
      const response = await wordService.getAllNotInDictionary(dictionaryid);
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
        builder.addCase(fetchWordsNotInDictionary.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.wordsNotInDictionary = action.payload;
        })
    }
});

export {
    fetchWords, createWord, fetchWordsNotInDictionary
}

export default wordSlice.reducer;




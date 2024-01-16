import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex, remove } from "lodash";
import CreateWordInput from "../../types/inputs/user/CreateWordInput";
import wordService from "../../services/api/routes/words";
import dictionaryService from "../../services/api/routes/dictionaries";
import Word from "../../types/models/Word";
import CRUD_ACTION from "../../types/enums/CrudAction";
import AddWordsToDictionaryInput from "../../types/inputs/dictionary/AddWordsToDictInput";
import FetchTranslationInput from "../../types/inputs/word/FetchTranslationInput";
import RemoveWordFromDictInput from "../../types/inputs/dictionary/RemoveWordFromDictInput";

interface WordsState {
    words: Word[];
    wordsNotInDictionary: Word[];
    wordsToBeAdded: Word[];
    dictionaryWords: Word[];
    wordsInDictionary: Word[];
    createFormState: CRUD_ACTION;
    selectedWord: Word | undefined;
    createWordHelperText: string;
}

const initialState: WordsState = {
    words: [],
    wordsNotInDictionary: [],
    wordsToBeAdded: [],
    dictionaryWords: [],
    wordsInDictionary: [],
    createFormState: CRUD_ACTION.READ,
    selectedWord: undefined,
    createWordHelperText: "",
}

const fetchWords = createAsyncThunk(
    'words/fetchAll',
    async (languageid: number) => {
        const response = await wordService.getAll(languageid);
        return response.data;
    }
);

const deleteWord = createAsyncThunk(
    'words/delete',
    async (wordid: number) => {
        const response = await wordService.delete(wordid);
        return wordid;
    }
);

const fetchWordsInDictionary = createAsyncThunk(
    'words/fetchAllInDictionary',
    async (dictionaryid: number) => {
        const response = await wordService.getAllInDictionary(dictionaryid);
        return response.data;
    }
);

const fetchWordsNotInDictionary = createAsyncThunk(
    'words/fetchNotInDictionary',
    async (dictionaryid: number) => {
        const response = await wordService.getAllNotInDictionary(dictionaryid);
        return response.data;
    }
);

const createWord = createAsyncThunk(
    'words/createWordStatus',
    async (data: CreateWordInput) => {
        const response = await wordService.createWord(data, data.languageid);
        return response.data;
    }
);

const addWordsToDictionary = createAsyncThunk(
    'words/addWordsToDictionaryStatus',
    async (dictInput: AddWordsToDictionaryInput) => {
        const response = await dictionaryService.addWordsToDictionary(dictInput);
        return response.data;
    }
);

const removeWordFromDictionary = createAsyncThunk(
    'words/removeWordFromDictionaryStatus',
    async (input: RemoveWordFromDictInput) => {
        const response = await dictionaryService.removeWordFromDictionary(input);
        return input.wordid;
    }
)

const fetchTranslation = createAsyncThunk(
    'words/fetchTranslationStatus',
    async ({ croatianname, destIsocode }: FetchTranslationInput) => {
        const response = await wordService.translate(croatianname, destIsocode);
        return response.data;
    }
);

const wordSlice = createSlice({
    name: "words",
    initialState,
    reducers: {
        clearHelperText: (state) => {
            state.createWordHelperText = "";
        },
        clearWordsNotInDict: (state) => {
            state.wordsNotInDictionary = [];
        },
        clearWordsInDict: (state) => {
            state.wordsInDictionary = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWords.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.words = action.payload;
        });

        builder.addCase(fetchWordsNotInDictionary.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.wordsNotInDictionary = action.payload;
        });

        builder.addCase(fetchWordsInDictionary.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.wordsInDictionary = action.payload;
        });

        builder.addCase(addWordsToDictionary.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.wordsInDictionary.push(...action.payload);
        });

        builder.addCase(deleteWord.fulfilled, (state, action: PayloadAction<number>) => {
            remove(state.words, el => el.wordid === action.payload);
        });

        builder.addCase(fetchTranslation.fulfilled, (state, action: PayloadAction<string>) => {
            state.createWordHelperText = action.payload;
        });

        builder.addCase(removeWordFromDictionary.fulfilled, (state, action: PayloadAction<number>) => {
            remove(state.wordsInDictionary, el => el.wordid === action.payload);
        });
    }
});

export const {
    clearHelperText,
    clearWordsNotInDict,
    clearWordsInDict,
} = wordSlice.actions;

export {
    fetchWords,
    createWord,
    fetchWordsNotInDictionary,
    fetchWordsInDictionary,
    addWordsToDictionary,
    deleteWord,
    fetchTranslation,
    removeWordFromDictionary,
};

export default wordSlice.reducer;




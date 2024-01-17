import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex, remove } from "lodash";
import CreateWordInput from "../../types/inputs/word/CreateWordInput";
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
    createWordHelperText: string | undefined;
    selectedEditWord: Word | undefined;
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
    selectedEditWord: undefined,
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
);

const fetchTranslation = createAsyncThunk(
    'words/fetchTranslationStatus',
    async ({ croatianname, destIsocode }: FetchTranslationInput) => {
        const response = await wordService.translate(croatianname, destIsocode);
        return response.data;
    }
);

const fetchWordDetails = createAsyncThunk(
    'words/fetchWordDetailsStatus',
    async (wordid: number) => {
        const response = await wordService.getWordDetails(wordid);
        return response.data;
    }
);

const editWord = createAsyncThunk(
    'words/editWordStatus',
    async (input: Word) => {
        const response = await wordService.updateWord(input);
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
        clearSelectedEditWord: (state) => {
            state.selectedEditWord = undefined;
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

        builder.addCase(createWord.fulfilled, (state, action: PayloadAction<Word>) => {
            state.words.push(action.payload);
        })

        builder.addCase(addWordsToDictionary.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.wordsInDictionary.push(...action.payload);
        });

        builder.addCase(deleteWord.fulfilled, (state, action: PayloadAction<number>) => {
            remove(state.words, el => el.wordid === action.payload);
        });

        builder.addCase(fetchTranslation.fulfilled, (state, action: PayloadAction<string>) => {
            state.createWordHelperText = action.payload;
        }).addCase(fetchTranslation.pending, (state, action) => {
            state.createWordHelperText = undefined;
        }).addCase(fetchTranslation.rejected, (state, action) => {
            state.createWordHelperText = "";
        });

        builder.addCase(removeWordFromDictionary.fulfilled, (state, action: PayloadAction<number>) => {
            remove(state.wordsInDictionary, el => el.wordid === action.payload);
        });

        builder.addCase(fetchWordDetails.fulfilled, (state, action: PayloadAction<Word>) => {
            state.selectedEditWord = action.payload;
        });

        builder.addCase(editWord.fulfilled, (state, action: PayloadAction<Word>) => {
            let idx = findIndex(state.words, el => el.wordid === action.payload.wordid);
            state.words[idx] = action.payload;
        });
    }
});

export const {
    clearHelperText,
    clearWordsNotInDict,
    clearWordsInDict,
    clearSelectedEditWord,
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
    fetchWordDetails,
    editWord,
};

export default wordSlice.reducer;




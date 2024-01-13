import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findIndex, remove } from "lodash";
import CreateWordInput from "../../types/inputs/user/CreateWordInput";
import GetWordTranslationInput from "../../types/inputs/word/GetWordTranslationInput";
import wordService from "../../services/api/routes/words";
import Word from "../../types/models/Word";
import { words } from "lodash";
import CRUD_ACTION from "../../types/enums/CrudAction";
import AddWordsToDictionaryInput from "../../types/inputs/dictionary/AddWordsToDictInput";

interface WordsState {
    words: Word[];
    wordsNotInDictionary: Word[];   // za dodavanje rijeci u rjecnik prvo treba uzeti sve rijeci koje nisu u rjecniku
    wordsToBeAdded: Word[];         // odabrane rijeci idu u ovaj array
    dictionaryWords: Word[]; //Moguci problem down the line oko tipa, ako bude problema, tu pogledati
    wordsInDictionary: Word[];
    createFormState: CRUD_ACTION;
    selectedWord: Word | undefined;
}

const initialState: WordsState = {
    words: [],
    wordsNotInDictionary: [],
    wordsToBeAdded: [],
    dictionaryWords: [],
    wordsInDictionary: [],
    createFormState: CRUD_ACTION.READ,
    selectedWord: undefined,
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
    'dictionaries/add-words',
    async (dictInput: AddWordsToDictionaryInput) => {
      const response = await wordService.addWordsToDictIOnary(dictInput);
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
        });
        builder.addCase(fetchWordsInDictionary.fulfilled, (state, action: PayloadAction<Word[]>) => {
            state.wordsInDictionary = action.payload;
        });
        // builder.addCase(addWordsToDictionary.fulfilled, (state, action: PayloadAction<AddWordsToDictionaryInput>) => {
        //     var addedWords: Word[] = []
        //     var selectedIds: number[] = action.payload.wordids
        //     for(var i=0; i< state.words.length; i++){
        //         for(var j=0; j<selectedIds.length; j++){
        //             if(state.words[i].wordid === selectedIds[j]) addedWords.push(state.words[i]);
        //         }
        //     }
        //     state.wordsInDictionary.push(addedWords);
        // });
        builder.addCase(deleteWord.fulfilled, (state, action: PayloadAction<number>) => {
            remove(state.words, el => el.wordid === action.payload);
        });
    }
});

export {
    fetchWords,
    createWord,
    fetchWordsNotInDictionary,
    fetchWordsInDictionary,
    addWordsToDictionary,
    deleteWord,
}

export default wordSlice.reducer;




import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import wordService from "../../services/api/routes/words";
import Word from "../../types/models/Word";
import GetWordChoicesInput from "../../types/inputs/word/GetWordChoicesInput";
import UpdateWordStateInput from "../../types/inputs/word/UpdateWordStateInput";
import GetAudioScoreInput from "../../types/inputs/word/GetAudioScoreInput";
import STUDY_TYPE from "../../types/enums/StudyType";


interface StudySessionState {
  availableWords: Word[];
  choices: Word[];
  currentQuestionIdx: number | undefined;
  selectedStudyType: STUDY_TYPE | undefined;
  pronunciationScore: number | undefined;
}

const initialState: StudySessionState = {
  availableWords: [],
  choices: [],
  currentQuestionIdx: undefined,
  selectedStudyType: undefined,
  pronunciationScore: undefined,
}

const fetchAvailableWords = createAsyncThunk(
  'studySession/fetchAll',
  async (dictionaryid: number) => {
    const response = await wordService.getAvailable(dictionaryid);
    return response.data;
  }
);

const fetchNextQuestion = createAsyncThunk(
  'studySession/fetchNextQuestion',
  async ({ dictionaryid, wordid }: GetWordChoicesInput) => {
    const response = await wordService.getChoices(dictionaryid, wordid);
    return response.data;
  }
);

const updateWordState = createAsyncThunk(
  'studySession/updateWordState',
  async (data: UpdateWordStateInput) => {
    const response = await wordService.updateWordState(data);
    return response.data;
  }
);

const fetchPronunciationScore = createAsyncThunk(
  'studySessioin/fetchPronunciationScore',
  async ({ wordid, audiourl }: GetAudioScoreInput) => {
    let splitted = audiourl.split("/");

    const response = await wordService.getAudioScore({
      wordid: wordid,
      audiourl: splitted[splitted.length - 1],
    });

    return response.data.score;
  }
);

const studySessionSlice = createSlice({
  name: "studySession",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.availableWords = [];
      state.choices = [];
      state.currentQuestionIdx = undefined;
      state.selectedStudyType = undefined;
      state.pronunciationScore = undefined;
    },
    setSelectedStudyType: (state, action: PayloadAction<STUDY_TYPE>) => {
      state.selectedStudyType = action.payload;
    },
    clearPronunciationScore: (state) => {
      state.pronunciationScore = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableWords.fulfilled, (state, action: PayloadAction<Word[]>) => {
      state.availableWords = action.payload;
    });

    builder.addCase(fetchNextQuestion.fulfilled, (state, action: PayloadAction<Word[]>) => {
      state.choices = action.payload;
      if (state.currentQuestionIdx !== undefined && state.currentQuestionIdx < state.availableWords.length) {
        state.currentQuestionIdx = state.currentQuestionIdx + 1;
      } else {
        state.currentQuestionIdx = 0;
      }
    });

    builder.addCase(fetchPronunciationScore.fulfilled, (state, action: PayloadAction<number>) => {
      state.pronunciationScore = action.payload;
    })
  }
});

export const {
  clearSession,
  setSelectedStudyType,
  clearPronunciationScore,
} = studySessionSlice.actions;

export {
  fetchAvailableWords,
  fetchNextQuestion,
  updateWordState,
  fetchPronunciationScore,
};

export default studySessionSlice.reducer;
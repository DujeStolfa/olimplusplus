import React, { useEffect, useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableHeading } from "../../components/common/styled";
import { RootState, useAppDispatch } from "../../redux/store";
import { clearPronunciationScore, clearSession, fetchNextQuestion, fetchPronunciationScore, updateWordState } from "../../redux/slices/studySessionSlice";
import { clearSelectedDictionary } from "../../redux/slices/studentDictionariesSlice";
import { QuestionBodyWrapper } from "./index.styled";
import Error from "../../components/common/Error";
import route from "../../constants/route";
import STUDY_TYPE from "../../types/enums/StudyType";
import MultipleChoiceList from "./MultipleChoiceList";
import AnswerFeedback from "./AnswerFeedback"
import SpellingInput from "./SpellingInput";
import SpeakingInput from "./SpeakingInput";

const Study = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { availableWords, currentQuestionIdx, choices, selectedStudyType, pronunciationScore } = useSelector((state: RootState) => state.studySesion);

  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [spellingAnswer, setSpellingAnswer] = useState<string | undefined>(undefined);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (currentQuestionIdx === undefined && availableWords.length > 0) {
      dispatch(fetchNextQuestion({ dictionaryid: 1, wordid: availableWords[0].wordid }));
    }
  }, [availableWords]);

  useEffect(() => {
    if (
      pronunciationScore !== undefined
      && pronunciationScore > 0
      && currentQuestionIdx !== undefined
    ) {
      let check = pronunciationScore >= 5;

      dispatch(updateWordState({ wordid: availableWords[currentQuestionIdx].wordid, correct: check }));
      setCorrect(check);
    }
  }, [pronunciationScore]);

  const stopSession = () => {
    setShowFeedback(false);
    setAnswer(undefined);
    setSpellingAnswer(undefined);
    setCorrect(undefined);
    dispatch(clearSession());
    dispatch(clearSelectedDictionary());
    navigate(`/${route.selectDictionary}`);
  }

  const handleConfirm = () => {
    if (currentQuestionIdx !== undefined) {
      if (!showFeedback && answer !== undefined) {
        setShowFeedback(true);

        const check = choices[answer].wordid === availableWords[currentQuestionIdx].wordid;
        dispatch(updateWordState({ wordid: availableWords[currentQuestionIdx].wordid, correct: check }));
        setCorrect(check);
      }
      else if (!showFeedback && spellingAnswer !== undefined) {
        setShowFeedback(true);

        const check = availableWords[currentQuestionIdx].foreignname === spellingAnswer;
        dispatch(updateWordState({ wordid: availableWords[currentQuestionIdx].wordid, correct: check }));
        setCorrect(check);
      }
      else if (!showFeedback && audioUrl !== null) {
        setShowFeedback(true);
        dispatch(fetchPronunciationScore({ audiourl: audioUrl, wordid: availableWords[currentQuestionIdx].wordid }));

      }
      else {
        if (currentQuestionIdx < availableWords.length - 1) {
          dispatch(fetchNextQuestion({ dictionaryid: 1, wordid: availableWords[currentQuestionIdx + 1].wordid }));
          setAnswer(undefined);
          setSpellingAnswer(undefined);
          setShowFeedback(false);
          setCorrect(undefined);
          setAudioUrl(null);
          dispatch(clearPronunciationScore());
        } else {
          stopSession();
        }
      }
    }
  }

  if (availableWords.length === 0) {
    return <Error errorText="Odabrani rječnik trenutno nema dostupnih riječi." />;
  }

  if (currentQuestionIdx === undefined) {
    return <Error errorText="" />;
  }

  return (
    <Container>
      <TableHeading variant="h4">Prijevod strane riječi</TableHeading>

      <Stack direction="column" alignItems="center">
        <QuestionBodyWrapper>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">
              {
                (selectedStudyType === STUDY_TYPE.ForeignToNative || selectedStudyType === STUDY_TYPE.Speaking)
                  ? availableWords[currentQuestionIdx]?.foreignname
                  : (selectedStudyType === STUDY_TYPE.NativeToForeign)
                    ? availableWords[currentQuestionIdx]?.croatianname
                    : (selectedStudyType == STUDY_TYPE.Listening)
                      ? `listening to ${availableWords[currentQuestionIdx]?.croatianname}`
                      : ""
              }
            </Typography>
            <Typography variant="button" color="gray">{currentQuestionIdx + 1}/{availableWords.length}</Typography>
          </Stack>

          {
            (showFeedback && correct !== undefined)
              ? <AnswerFeedback correct={correct} />
              : (selectedStudyType === STUDY_TYPE.ForeignToNative)
                ? <MultipleChoiceList answer={answer} setAnswer={setAnswer} attribute="croatianname" />
                : (selectedStudyType === STUDY_TYPE.NativeToForeign)
                  ? <MultipleChoiceList answer={answer} setAnswer={setAnswer} attribute="foreignname" />
                  : (selectedStudyType === STUDY_TYPE.Listening)
                    ? <SpellingInput spellingAnswer={spellingAnswer} setSpellingAnswer={setSpellingAnswer} />
                    : (selectedStudyType === STUDY_TYPE.Speaking)
                      ? <SpeakingInput audioUrl={audioUrl} setAudioUrl={setAudioUrl} />
                      : <>error</>
          }

          <Stack direction="row" justifyContent="space-between">
            <Button size="large" color="error" onClick={() => stopSession()}>Zaustavi učenje</Button>

            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => handleConfirm()}
              disabled={
                answer === undefined
                && spellingAnswer === undefined
                && audioUrl === null
                && !showFeedback
              }
            >
              {(!showFeedback) ? "Potvrdi" : (currentQuestionIdx == availableWords.length - 1) ? "Završi učenje" : "Nastavi"}
            </Button>
          </Stack>

        </QuestionBodyWrapper>
      </Stack>
    </Container>
  );
}

export default Study;
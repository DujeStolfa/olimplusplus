import React from "react";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FeedbackWrapper } from "./index.styled";
import { RootState } from "../../redux/store";
import STUDY_TYPE from "../../types/enums/StudyType";

interface Props {
  correct: boolean;
}

const AnswerFeedback = ({ correct }: Props) => {
  const { availableWords, currentQuestionIdx, selectedStudyType, pronunciationScore } = useSelector((state: RootState) => state.studySesion);

  if (currentQuestionIdx === undefined) {
    return (
      <FeedbackWrapper>
        <Typography variant="h4" margin={1}> Došlo je do neočekivane greške :/ </Typography>
      </FeedbackWrapper>
    );
  }

  if (pronunciationScore !== undefined) {
    return (
      <FeedbackWrapper>
        <Typography variant="h4" margin={1}>
          {correct ? "Točno" : "Netočno"}
        </Typography>
        <Typography variant="subtitle1" marginBottom={1}>
          {pronunciationScore} / 10
        </Typography>
        {
          correct
            ? <SentimentVerySatisfiedIcon color="success" fontSize="large" />
            : <SentimentDissatisfiedIcon color="warning" fontSize="large" />
        }
      </FeedbackWrapper >
    );
  }

  if (!correct) {
    return (
      <FeedbackWrapper>
        <Typography variant="h4" margin={1}> Netočno </Typography>
        <Typography variant="subtitle1" marginBottom={1}>
          Točan odgovor je {
            (selectedStudyType === STUDY_TYPE.ForeignToNative)
              ? availableWords[currentQuestionIdx]?.croatianname
              : (selectedStudyType === STUDY_TYPE.NativeToForeign || selectedStudyType === STUDY_TYPE.Listening)
                ? availableWords[currentQuestionIdx]?.foreignname
                : ""
          }
        </Typography>
        <SentimentDissatisfiedIcon color="warning" fontSize="large" />
      </FeedbackWrapper>
    );
  }

  return (
    <FeedbackWrapper>
      <Typography variant="h4" margin={1}> Točno </Typography>
      <SentimentVerySatisfiedIcon color="success" fontSize="large" />
    </FeedbackWrapper>
  );
}

export default AnswerFeedback;
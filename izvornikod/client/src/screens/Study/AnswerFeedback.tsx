import React from "react";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FeedbackWrapper } from "./index.styled";
import { RootState } from "../../redux/store";

interface Props {
  correct: boolean;
}

const AnswerFeedback = ({ correct }: Props) => {
  const { availableWords, currentQuestionIdx } = useSelector((state: RootState) => state.studySesion);

  if (currentQuestionIdx === undefined) {
    return (
      <FeedbackWrapper>
        <Typography variant="h4" margin={1}> Došlo je do neočekivane greške :/ </Typography>
      </FeedbackWrapper>
    );
  }

  if (!correct) {
    return (
      <FeedbackWrapper>
        <Typography variant="h4" margin={1}> Netočno </Typography>
        <Typography variant="subtitle1" marginBottom={1}> Točan odgovor je {availableWords[currentQuestionIdx]?.croatianname} </Typography>
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
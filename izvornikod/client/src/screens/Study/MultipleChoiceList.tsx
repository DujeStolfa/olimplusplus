import React, { Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MultipleChoiceItem from "./MultipleChoiceItem";

interface Props {
  setAnswer: Dispatch<SetStateAction<number | undefined>>;
  answer: number | undefined;
}

const MultipleChoiceList = ({ answer, setAnswer }: Props) => {
  const { choices } = useSelector((state: RootState) => state.studySesion);
  return <Stack direction="column" spacing={2}>
    {
      choices.map((el, i) => <MultipleChoiceItem text={el.croatianname} onClick={() => setAnswer(i)} selected={answer === i} />)
    }
  </Stack>
}

export default MultipleChoiceList;
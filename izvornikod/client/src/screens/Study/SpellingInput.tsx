import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SpellingFormWrapper } from "./index.styled";

interface Props {
  spellingAnswer: string | undefined;
  setSpellingAnswer: Dispatch<SetStateAction<string | undefined>>;
}

const SpellingInput = ({ setSpellingAnswer, spellingAnswer }: Props) => {

  return (
    <SpellingFormWrapper component="form" autoComplete="off">
      <TextField
        id="outlined-controlled"
        label="Odgovor"
        value={spellingAnswer}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSpellingAnswer(event.target.value);
        }}
      />
    </SpellingFormWrapper>
  )
}

export default SpellingInput;
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StorageReference, getBytes, getDownloadURL, ref } from "firebase/storage";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { RootState } from "../../redux/store";
import { storageRef } from "../../firebaseConfig";
import { SpellingFormWrapper, StudyInputWrapper } from "./index.styled";


interface Props {
  spellingAnswer: string | undefined;
  setSpellingAnswer: Dispatch<SetStateAction<string | undefined>>;
}

const SpellingInput = ({ setSpellingAnswer, spellingAnswer }: Props) => {
  const { availableWords, currentQuestionIdx } = useSelector((state: RootState) => state.studySesion);
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchUrl = async (audioRef: StorageReference) => {
      const downloadUrl = await getDownloadURL(audioRef);
      setAudioUrl(downloadUrl);
    }

    if (availableWords.length !== 0 && currentQuestionIdx !== undefined) {
      const audioRef = ref(storageRef, availableWords[currentQuestionIdx].audiopath);
      fetchUrl(audioRef);
    }
  }, [availableWords, currentQuestionIdx]);


  return <StudyInputWrapper>
    {
      audioUrl && (
        <audio key={audioUrl} controls>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )
    }
    <br />
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
  </StudyInputWrapper>;
}

export default SpellingInput;
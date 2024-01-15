import React, { Dispatch, SetStateAction } from "react";
import { StudyInputWrapper } from "./index.styled";
import VoiceRecorder from "./VoiceRecorder";

interface Props {
  audioUrl: string | null;
  setAudioUrl: Dispatch<SetStateAction<string | null>>;
}

const SpeakingInput = ({ audioUrl, setAudioUrl }: Props) => {
  return <StudyInputWrapper>
    <VoiceRecorder audioUrl={audioUrl} setAudioUrl={setAudioUrl} />
  </StudyInputWrapper>;
}

export default SpeakingInput;
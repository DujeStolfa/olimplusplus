import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

const VoiceRecorder = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      />
      <br />
      {audioUrl && (
        <audio key={audioUrl} controls>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )}
    </>
  );
};

export default VoiceRecorder;

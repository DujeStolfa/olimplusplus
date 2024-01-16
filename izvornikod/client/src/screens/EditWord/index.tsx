import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography, Grid, ClickAwayListener } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { uploadBytes, ref } from "firebase/storage";
import { RootState, useAppDispatch } from "../../redux/store";
import { clearHelperText, clearSelectedEditWord, createWord, editWord, fetchTranslation } from "../../redux/slices/wordsSlice";
import { FormTitleWrapper, FormWrapper } from "../../components/common/styled";
import { storageRef } from "../../firebaseConfig";
import CreateWordInput from "../../types/inputs/word/CreateWordInput";
import route from "../../constants/route";
import Phrase from "../../types/models/Phrase";


const EditWord = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedLanguage } = useSelector((state: RootState) => state.languages);
  const { createWordHelperText, selectedEditWord } = useSelector((state: RootState) => state.words);
  const { register, handleSubmit, setValue } = useForm<CreateWordInput>({
    defaultValues: {
      audiopath: "audio",
    },
  });

  const [phrases, setPhrases] = useState<string[]>([]);
  const [audioFileName, setAudioFileName] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [foreignname, setForeignname] = useState<string>("");
  const [croatianname, setCroatianname] = useState<string>("");
  const [activeAudio, setActiveAudio] = useState<HTMLMediaElement | undefined>(undefined);
  const [audioIsPlaying, setAudioIsPlaying] = useState<boolean>(false);

  // TODO: dodat progress na foreignname input

  useEffect(() => {
    if (selectedEditWord !== undefined) {
      if (selectedEditWord.phrases !== undefined) {
        setPhrases(selectedEditWord.phrases.map(el => el.phrase));
      }

      setAudioFileName(selectedEditWord.audiopath.split("_")[1]);
      setForeignname(selectedEditWord.foreignname);
      setCroatianname(selectedEditWord.croatianname);
    }
  }, [selectedEditWord]);



  // useEffect(() => {
  //   setForeignname(createWordHelperText);
  // }, [createWordHelperText]);

  const handleCreate = () => {
    const phrasesTextField = document.getElementById(
      "phrases"
    ) as HTMLInputElement;
    const phrase = phrasesTextField.value;
    if (phrase.length !== 0) {
      setPhrases((prevPhrases) => [phrase, ...prevPhrases]);
      phrasesTextField.value = "";
    }
  };

  const handleDelete = (index: number) => {
    setPhrases((prevPhrases) => prevPhrases.filter((_, i) => i !== index));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);
      setValue("audiopath", file.name);
    }
  };

  const handlePlayAudio = () => {
    if (audioFile) {
      if (activeAudio === undefined) {
        const audio = new Audio(URL.createObjectURL(audioFile));
        audio.play();
        setActiveAudio(audio);
        setAudioIsPlaying(true);
      }
      else if (audioIsPlaying) {
        activeAudio.pause();
        setAudioIsPlaying(false);
      } else {
        activeAudio.play();
        setAudioIsPlaying(true);
      }
    }
  };

  const handleTranslate = () => {
    if (selectedLanguage !== undefined && croatianname !== "") {
      dispatch(fetchTranslation({
        croatianname: croatianname,
        destIsocode: selectedLanguage.isocode,
      }));
    }
  };

  const onSubmit = (data: CreateWordInput) => {
    if (selectedLanguage !== undefined && selectedEditWord !== undefined) {
      const currTimestamp = Date.now();

      dispatch(editWord({
        wordid: selectedEditWord.wordid,
        audiopath: (audioFile) ? `${currTimestamp}_${data.audiopath}` : selectedEditWord?.audiopath,
        phrases: phrases.map(el => {
          return { phrase: el } as Phrase;
        }),
        croatianname: croatianname,
        foreignname: foreignname,
      }));

      if (audioFile) {
        const audioRef = ref(storageRef, `${currTimestamp}_${audioFileName}`);
        uploadBytes(audioRef, audioFile);
      }

      navigate(`/${route.words}`);
      dispatch(clearHelperText());
    }
  };

  return (
    <Container maxWidth="sm">
      <Box padding="2em"></Box>
      <FormWrapper>
        <FormTitleWrapper>
          <Typography component="h1" variant="h5">
            Uredi riječ
          </Typography>
        </FormTitleWrapper>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ClickAwayListener
                onClickAway={() => {
                  if (createWordHelperText.length === 0) {
                    handleTranslate();
                  }
                }}
              >
                <TextField
                  {...register("croatianname")}
                  required
                  fullWidth
                  id="word"
                  label="Riječ (HR)"
                  variant="outlined"
                  value={croatianname}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCroatianname(event.target.value);
                  }}
                />
              </ClickAwayListener>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("foreignname")}
                required
                fullWidth
                id="translation"
                label={`Prijevod (${selectedLanguage?.isocode.toUpperCase()})`}
                variant="outlined"
                value={foreignname}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setForeignname(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="phrases"
                    label="Fraze"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleCreate}>
                    create
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {phrases.map((phrase, index) => (
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs key={index}>
                    <TextField
                      fullWidth
                      value={phrase}
                      variant="outlined"
                      disabled
                      id={`phrase${index}`}
                    />
                  </Grid>
                  <Grid item key={`${index}-button`}>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(index)}
                    >
                      delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            {/* <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs>
                  <TextField
                    {...register("audiopath")}
                    required
                    fullWidth
                    id="audio"
                    label="Audio"
                    variant="outlined"
                    disabled
                    value={audioFileName}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" component="label">
                    upload
                    <input
                      type="file"
                      hidden
                      required
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="space-around">
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth onClick={() => navigate(`/${route.words}`)}>
                    odustani
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    potvrdi
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormWrapper>
    </Container>
  );
};

export default EditWord;

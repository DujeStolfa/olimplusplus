import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography, Grid, ClickAwayListener } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { clearHelperText, createWord, fetchTranslation } from "../../redux/slices/wordsSlice";
import { storageRef } from "../../firebaseConfig";
import { uploadBytes, ref } from "firebase/storage";
import route from "../../constants/route";
import CreateWordInput from "../../types/inputs/user/CreateWordInput";
import { FormTitleWrapper, FormWrapper } from "../Login/index.styled";


const CreateWord = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedLanguage } = useSelector((state: RootState) => state.languages);
  const { createWordHelperText } = useSelector((state: RootState) => state.words);
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

  // TODO: dodat progress na foreignname input

  useEffect(() => {
    setForeignname(createWordHelperText);
  }, [createWordHelperText]);

  const handleCreate = () => {
    const phrasesTextField = document.getElementById(
      "phrases"
    ) as HTMLInputElement;
    const phrase = phrasesTextField.value;
    setPhrases((prevPhrases) => [...prevPhrases, phrase]);
    phrasesTextField.value = "";
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
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.play();
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

  const onSubmit = async (data: CreateWordInput) => {
    if (selectedLanguage !== undefined) {
      dispatch(createWord({
        ...data,
        croatianname: croatianname,
        foreignname: foreignname,
        languageid: selectedLanguage.languageid
      }));

      if (audioFile) {
        const audioRef = ref(storageRef, audioFileName);
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
            Edit admin
          </Typography>
        </FormTitleWrapper>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ClickAwayListener
                onClickAway={handleTranslate}
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
                  <Grid item>
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

            <Grid item xs={12}>
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
                <Grid item>
                  <Button variant="contained" onClick={handlePlayAudio}>
                    play
                  </Button>
                </Grid>
              </Grid>
            </Grid>
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

export default CreateWord;

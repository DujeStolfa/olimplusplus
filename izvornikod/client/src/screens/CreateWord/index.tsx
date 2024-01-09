import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { createWord } from "../../redux/slices/wordsSlice";
import route from "../../constants/route";
import CreateWordInput from "../../types/inputs/user/CreateWordInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

const CreateWord = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<CreateWordInput>({
    defaultValues: {
      audiopath: "audio",
    },
  });

  const [phrases, setPhrases] = useState<string[]>([]);
  const [audioFileName, setAudioFileName] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

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
      setValue("audiopath", file.name); // Register the file name in the form
    }
  };

  const handlePlayAudio = () => {
    if (audioFile) {
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.play();
    }
  };

  const onSubmit = async (data: CreateWordInput) => {
    await dispatch(createWord(data));
    navigate(`/${route.editDictionary}`);
  };

  return (
    <Container maxWidth="sm">
      <Box m={2}>
        <Typography variant="h6" gutterBottom>
          Create/edit riječ
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("croatianname")}
              required
              fullWidth
              id="word"
              label="Riječ"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("foreignname")}
              required
              fullWidth
              id="translation"
              label="Prijevod"
              variant="outlined"
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
                <Button variant="outlined" fullWidth>
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
    </Container>
  );
};

export default CreateWord;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Chip, Grid, Typography } from "@mui/material";
import { DictionaryCardWrapper } from "./index.styled";
import { useAppDispatch } from "../../redux/store";
import { setSelectedDictionary } from "../../redux/slices/studentDictionariesSlice";
import StudentDictionary from "../../types/models/StudentDictionary";
import route from "../../constants/route";

interface Props {
  dictionary: StudentDictionary;
}

const DictionaryCard = ({ dictionary }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (dictionary.totalwordcount === 0) {
    return (
      <DictionaryCardWrapper>
        <Typography variant="h5">{dictionary.dictionaryname}</Typography>
        <Typography variant="subtitle1">Rječnik je prazan</Typography>
      </DictionaryCardWrapper>
    )
  }

  if (dictionary.totalwordcount < 4) {
    return (
      <DictionaryCardWrapper>
        <Typography variant="h5">{dictionary.dictionaryname}</Typography>
        <Typography variant="subtitle1">Rječnik nema dovoljno riječi za učenje</Typography>
      </DictionaryCardWrapper>
    )
  }

  return (
    <DictionaryCardWrapper
      sx={{
        "&:hover": {
          backgroundColor: "#f3f3f3"
        }
      }}
      onClick={() => {
        dispatch(setSelectedDictionary(dictionary));
        navigate(`/${route.studyTypes}`);
      }}
    >
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h5">{dictionary.dictionaryname}</Typography>
          <Typography variant="subtitle1">Dostupno: {dictionary.availablewordcount}/{dictionary.totalwordcount} riječi</Typography>
        </Grid>
        <Grid item xs={2}>
          <Chip variant="outlined" color="primary" size="small" label={`${100 - Math.round(100 * dictionary.unfinishedwordcount / dictionary.totalwordcount)}%`} />
        </Grid>
      </Grid>
    </DictionaryCardWrapper >
  )
}

export default DictionaryCard;
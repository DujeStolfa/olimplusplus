import React from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { DictionaryCardWrapper } from "./index.styled";

const DictionaryCard = () => {
  return (
    <DictionaryCardWrapper>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h5">Ime rječnika</Typography>
          <Typography variant="subtitle1">Dostupno: 6/25 riječi</Typography>
        </Grid>
        <Grid item xs={2}>
          <Chip variant="outlined" color="primary" size="small" label="100%" />
        </Grid>
      </Grid>
    </DictionaryCardWrapper>
  )
}

export default DictionaryCard;
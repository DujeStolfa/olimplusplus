import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InfoWrapper } from "../styled";

interface Props {
  errorText: string
}

const Error = ({ errorText }: Props) => {
  const navigate = useNavigate();

  return (
    <InfoWrapper>
      <Typography variant="h2" sx={{ marginBottom: 0.7 }}>Došlo je do greške :/</Typography>
      <Typography variant="h6">{errorText}</Typography>
      <Box margin={1}>
        <Button variant="text" onClick={() => navigate(-1)}>Natrag</Button>
      </Box>
    </InfoWrapper>
  );
}

export default Error;


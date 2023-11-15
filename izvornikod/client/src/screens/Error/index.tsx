import React from "react";
import { Typography } from "@mui/material";
import { InfoWrapper } from "../../components/common/styled";

interface Props {
  errorText: string
}

const Error = ({ errorText }: Props) => {
  return (
    <InfoWrapper>
      <Typography variant="h2" sx={{ marginBottom: 0.7 }}>Došlo je do greške :/</Typography>
      <Typography variant="h6">{errorText}</Typography>
    </InfoWrapper>
  );
}

export default Error;


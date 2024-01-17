import React from "react";
import { Box, Typography } from "@mui/material";
import { MultipleChoiceButton } from "./index.styled";

interface Props {
  selected?: boolean;
  text: string;
  onClick: () => void;
}

const MultipleChoiceItem = ({ selected, text, onClick }: Props) => {
  return (
    <MultipleChoiceButton $selected={selected} onClick={onClick}>
      <Typography
        variant="subtitle1"
        mt={0.2}
        color="primary"
      >
        <Box component="span" fontWeight='fontWeightMedium'>
          {text.toUpperCase()}
        </Box>
      </Typography>
    </MultipleChoiceButton>
  );
}

export default MultipleChoiceItem;
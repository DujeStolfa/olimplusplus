import React, { Dispatch, SetStateAction, useState } from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Word from "../../types/models/Word";
import route from "../../constants/route";

interface Props {
  word: Word;
  setSelectedWord: Dispatch<SetStateAction<Word | undefined>>;
}

const WordsTableRow = ({ setSelectedWord, word }: Props) => {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={() => {
        navigate(`/${route.editWord}/${word.wordid}`);
      }}
    >
      <TableCell>{word.croatianname}</TableCell>
      <TableCell>{word.foreignname}</TableCell>
      <TableCell align="right">
        <IconButton
          size="small"
          onClick={(event) => {
            setSelectedWord(word);
            event.stopPropagation();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default WordsTableRow;
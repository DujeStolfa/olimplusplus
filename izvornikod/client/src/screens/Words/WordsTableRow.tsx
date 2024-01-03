import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Word from "../../types/models/Word";

interface Props {
  word: Word;
}

const WordsTableRow = ({ word }: Props) => {
  return (
    <TableRow
      hover
      onClick={() => {
        console.log(`Edit ${word.wordid}`);
      }}
    >
      <TableCell>{word.croatianname}</TableCell>
      <TableCell>{word.foreignname}</TableCell>
      <TableCell>nije implementirano</TableCell>
      <TableCell align="right">
        <IconButton
          size="small"
          onClick={(event) => {
            console.log(`Rename ${word.wordid}`);
            event.stopPropagation();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={(event) => {
            console.log(`Delete ${word.wordid}`);
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
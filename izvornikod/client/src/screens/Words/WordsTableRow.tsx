import React, { Dispatch, SetStateAction, useState } from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Word from "../../types/models/Word";
import CRUD_ACTION from "../../types/enums/CrudAction";
import RenameDictionaryForm from "./RenameWordForm";
import route from "../../constants/route";
import { useAppDispatch } from "../../redux/store";
import { selectDictionary } from "../../redux/slices/dictionariesSlice";

interface Props {
  word: Word;
  setSelectedWord: Dispatch<SetStateAction<Word | undefined>>;
}

const WordsTableRow = ({ setSelectedWord, word }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //  const [renameState, setRenameState] = useState<CRUD_ACTION>(CRUD_ACTION.READ);

  return (
    <TableRow
      hover
      onClick={() => {
        console.log(`Edit ${word.wordid}`);
      }}
    >
      <TableCell>{word.croatianname}</TableCell>
      <TableCell>{word.foreignname}</TableCell>
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
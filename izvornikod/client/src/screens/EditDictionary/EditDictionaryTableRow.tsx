import React, { Dispatch, SetStateAction } from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Word from "../../types/models/Word";

interface Props {
    word: Word;
    setSelectedWord: Dispatch<SetStateAction<Word | undefined>>;
}

const EditDictionaryTableRow = ({ word, setSelectedWord }: Props) => {
    return (
        <TableRow>
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

export default EditDictionaryTableRow;
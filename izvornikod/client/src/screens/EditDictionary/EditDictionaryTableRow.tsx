import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Word from "../../types/models/Word";

interface Props {
    word: Word;
}

const EditDictionaryTableRow = ({ word }: Props) => {
    return (
        <TableRow>
            <TableCell>{word.croatianname}</TableCell>
            <TableCell>{word.foreignname}</TableCell>
            <TableCell align="right">
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

export default EditDictionaryTableRow;
import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dictionary from "../../types/models/Dictionary";

interface Props {
  dictionary: Dictionary;
}

const DictionariesTableRow = ({ dictionary }: Props) => {
  return (
    <TableRow
      hover
      onClick={() => {
        console.log(`Edit ${dictionary.dictionaryid}`);
      }}
    >
      <TableCell>{dictionary.dictionaryname}</TableCell>
      <TableCell>
        {
          (new Date(dictionary.dictionarycreatedat + "Z")).toLocaleDateString("hr-HR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }
      </TableCell>
      <TableCell>nije implementirano</TableCell>
      <TableCell align="right">
        <IconButton
          size="small"
          onClick={(event) => {
            console.log(`Rename ${dictionary.dictionaryid}`);
            event.stopPropagation();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={(event) => {
            console.log(`Delete ${dictionary.dictionaryid}`);
            event.stopPropagation();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default DictionariesTableRow;
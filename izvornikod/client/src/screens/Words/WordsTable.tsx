import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import WordsTableRow from "./WordsTableRow";

const WordsTable = () => {
  const { words } = useSelector((state: RootState) => state.words);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell width="45%">Naziv</TableCell>
        <TableCell>Prijevod</TableCell>
        <TableCell width="10%"></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {words.map(el => <WordsTableRow word={el} />)}
    </TableBody>
  </Table>;
}

export default WordsTable;
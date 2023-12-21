import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DictionariesTableRow from "./DictionariesTableRow";

const DictionariesTable = () => {
  const { dictionaries } = useSelector((state: RootState) => state.dictionaries);

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell width="45%">Naziv</TableCell>
        <TableCell>Datum stvaranja</TableCell>
        <TableCell width="15%">Veličina</TableCell>
        <TableCell width="10%"></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {dictionaries.map(el => <DictionariesTableRow dictionary={el} />)}
    </TableBody>
  </Table>;
}

export default DictionariesTable;
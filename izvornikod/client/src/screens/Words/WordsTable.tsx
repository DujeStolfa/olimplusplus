import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import WordsTableRow from "./WordsTableRow";
import Word from "../../types/models/Word";
import ApproveDialog from "../../components/common/AprooveDialog";
import { deleteWord } from "../../redux/slices/wordsSlice";

const WordsTable = () => {
  const dispatch = useAppDispatch();
  const { words } = useSelector((state: RootState) => state.words);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<Word | undefined>(undefined);

  useEffect(() => {
    if (selectedWord !== undefined) {
      setOpenDialog(true);
    }
  }, [selectedWord]);

  const handleConfirm = () => {
    if (selectedWord !== undefined) {
      dispatch(deleteWord(selectedWord.wordid));
    }
    setOpenDialog(false);
  };

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell width="45%">Naziv</TableCell>
        <TableCell>Prijevod</TableCell>
        <TableCell width="10%"></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {words.map(el => <WordsTableRow setSelectedWord={setSelectedWord} word={el} />)}
    </TableBody>

    <ApproveDialog
      open={openDialog}
      title={`Izbrisati riječ ${selectedWord?.croatianname.toUpperCase()}?`}
      text={`Riječ će biti trajno izbrisana.`}
      confirmText="Izbriši"
      cancelText="Odustani"
      handleCancel={() => setOpenDialog(false)}
      handleConfirm={handleConfirm}
      handleExit={() => setSelectedWord(undefined)}
    />

  </Table>;
}

export default WordsTable;
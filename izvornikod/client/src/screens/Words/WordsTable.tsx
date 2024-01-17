import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { deleteWord } from "../../redux/slices/wordsSlice";
import ApproveDialog from "../../components/common/AprooveDialog";
import WordsTableRow from "./WordsTableRow";
import Word from "../../types/models/Word";

const WordsTable = () => {
  const dispatch = useAppDispatch();
  const { words } = useSelector((state: RootState) => state.words);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<Word | undefined>(undefined);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - words.length) : 0;

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      {(rowsPerPage > 0
        ? words.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : words
      ).map(el => <WordsTableRow setSelectedWord={setSelectedWord} word={el} />)}
      {emptyRows > 0 && (
        <TableRow style={{ height: 67 * emptyRows }}>
          <TableCell colSpan={3} />
        </TableRow>
      )}
    </TableBody>

    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={5}
          count={words.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>

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
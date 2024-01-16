import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { deleteDictionary } from "../../redux/slices/dictionariesSlice";
import ApproveDialog from "../../components/common/AprooveDialog";
import Dictionary from "../../types/models/Dictionary";
import DictionariesTableRow from "./DictionariesTableRow";

const DictionariesTable = () => {
  const dispatch = useAppDispatch();
  const { dictionaries } = useSelector((state: RootState) => state.dictionaries);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedDictionary, setSelectedDictionary] = useState<Dictionary | undefined>(undefined);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dictionaries.length) : 0;

  useEffect(() => {
    if (selectedDictionary !== undefined) {
      setOpenDialog(true);
    }
  }, [selectedDictionary]);

  const handleConfirm = () => {
    if (selectedDictionary !== undefined) {
      dispatch(deleteDictionary(selectedDictionary.dictionaryid));
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
        <TableCell>Datum stvaranja</TableCell>
        <TableCell width="15%">Veličina</TableCell>
        <TableCell width="10%"></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {(rowsPerPage > 0
        ? dictionaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : dictionaries
      ).map(el => <DictionariesTableRow setSelectedDictionary={setSelectedDictionary} dictionary={el} />)}
      {emptyRows > 0 && (
        <TableRow style={{ height: 67 * emptyRows }}>
          <TableCell colSpan={4} />
        </TableRow>
      )}
    </TableBody>

    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={4}
          count={dictionaries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>

    <ApproveDialog
      open={openDialog}
      title={`Izbrisati rječnik ${selectedDictionary?.dictionaryname.toUpperCase()}?`}
      text={`Rječnik će biti trajno izbrisan, ali sve dodane riječi neće biti izbrisane.`}
      confirmText="Izbriši"
      cancelText="Odustani"
      handleCancel={() => setOpenDialog(false)}
      handleConfirm={handleConfirm}
      handleExit={() => setSelectedDictionary(undefined)}
    />
  </Table>;
}

export default DictionariesTable;
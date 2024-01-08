import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import DictionariesTableRow from "./DictionariesTableRow";
import Dictionary from "../../types/models/Dictionary";
import ApproveDialog from "../../components/common/AprooveDialog";
import { deleteDictionary } from "../../redux/slices/dictionariesSlice";

const DictionariesTable = () => {
  const dispatch = useAppDispatch();
  const { dictionaries } = useSelector((state: RootState) => state.dictionaries);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedDictionary, setSelectedDictionary] = useState<Dictionary | undefined>(undefined);

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
      {dictionaries.map(el => <DictionariesTableRow setSelectedDictionary={setSelectedDictionary} dictionary={el} />)}
    </TableBody>

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
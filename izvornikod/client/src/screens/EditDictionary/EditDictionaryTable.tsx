import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { removeWordFromDictionary } from "../../redux/slices/wordsSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import EditDictionaryTableRow from "./EditDictionaryTableRow";
import ApproveDialog from "../../components/common/AprooveDialog";
import Word from "../../types/models/Word";


const EditDictionaryTable = () => {
    const dispatch = useAppDispatch();
    const { wordsInDictionary } = useSelector((state: RootState) => state.words);
    const { selectedDictionary } = useSelector((state: RootState) => state.dictionaries);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedWord, setSelectedWord] = useState<Word | undefined>(undefined);

    useEffect(() => {
        if (selectedWord !== undefined) {
            setOpenDialog(true);
        }
    }, [selectedWord]);

    const handleConfirm = () => {
        if (selectedWord !== undefined && selectedDictionary !== undefined) {
            dispatch(removeWordFromDictionary({
                dictionaryid: selectedDictionary.dictionaryid,
                wordid: selectedWord.wordid,
            }));
        }

        setOpenDialog(false);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Riječ</TableCell>
                    <TableCell>Prijevod</TableCell>
                    <TableCell width="10%"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    wordsInDictionary.map(
                        el => <EditDictionaryTableRow word={el} setSelectedWord={setSelectedWord} />
                    )
                }
            </TableBody>

            <ApproveDialog
                open={openDialog}
                title={`Ukloniti riječ ${selectedWord?.croatianname.toUpperCase()} - ${selectedWord?.foreignname.toUpperCase()}?`}
                text={`Riječ "${selectedWord?.croatianname} - ${selectedWord?.foreignname}" bit će uklonjena iz rječnika "${selectedDictionary?.dictionaryname}"?`}
                confirmText="Ukloni"
                cancelText="Odustani"
                handleCancel={() => setOpenDialog(false)}
                handleConfirm={handleConfirm}
                handleExit={() => setSelectedWord(undefined)}
            />
        </Table>
    );
}

export default EditDictionaryTable;
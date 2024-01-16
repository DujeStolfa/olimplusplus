import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wordsInDictionary.length) : 0;

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
                    (rowsPerPage > 0
                        ? wordsInDictionary.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : wordsInDictionary
                    ).map(
                        el => <EditDictionaryTableRow word={el} setSelectedWord={setSelectedWord} />
                    )
                }
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
                        colSpan={3}
                        count={wordsInDictionary.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>

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
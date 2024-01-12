import { Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { TableHeading, TableWrapper } from "../../components/common/styled";
import DeleteIcon from '@mui/icons-material/Delete';
import Word from "../../types/models/Word";
import EditDictionaryTableRow from "./EditDictionaryTableRow";
import { words } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const EditDictionaryTable = () => {
    const { wordsInDictionary } = useSelector((state: RootState) => state.words);

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
                    wordsInDictionary.map(el => <EditDictionaryTableRow word={el} />)
                }
            </TableBody>
        </Table>
    );
}

export default EditDictionaryTable;
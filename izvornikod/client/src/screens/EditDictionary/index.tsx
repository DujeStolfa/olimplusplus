import { Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { TableHeading, TableWrapper } from "../../components/common/styled";
import DeleteIcon from '@mui/icons-material/Delete';


const EditDictionary = () => {

    return (
        <Container>
            <TableHeading variant="h2">Uredi rječnik</TableHeading>

            <TableWrapper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Riječ</TableCell>
                            <TableCell>Prijevod</TableCell>
                            <TableCell width="10%"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>ovo</TableCell>
                            <TableCell>je probni redak</TableCell>
                            <TableCell>
                                <IconButton onClick={() => console.log("Delete word")}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableWrapper>
        </Container>

    );
}

export default EditDictionary;
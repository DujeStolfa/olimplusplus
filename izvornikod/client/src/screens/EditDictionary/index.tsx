import { Button, Container, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { TableHeading, TableWrapper } from "../../components/common/styled";
import EditDictionaryTable from "./EditDictionaryTable";
import { useNavigate } from "react-router-dom";
import route from "../../constants/route";

const EditDictionary = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <TableHeading variant="h2">Uredi rječnik</TableHeading>

                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => navigate(`/${route.addWords}`)}
                >
                    Dodaj riječ
                </Button>
            </Stack>

            <TableWrapper>
                <EditDictionaryTable />
            </TableWrapper>
        </Container>
    );
}
export default EditDictionary;
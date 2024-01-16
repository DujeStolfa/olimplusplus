import { Button, Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

import { TableHeading, TableWrapper } from "../../components/common/styled";
import { RootState } from "../../redux/store";
import EditDictionaryTable from "./EditDictionaryTable";
import route from "../../constants/route";


const EditDictionary = () => {
    const navigate = useNavigate();
    const { selectedDictionary } = useSelector((state: RootState) => state.dictionaries);
    const { wordsInDictionary } = useSelector((state: RootState) => state.words);

    return (
        <Container>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <TableHeading variant="h2" noWrap={true}>
                    {
                        (selectedDictionary !== undefined)
                            ? selectedDictionary.dictionaryname
                            : "Uredi rječnik"
                    }
                </TableHeading>

                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => navigate(`/${route.addWords}`)}
                >
                    Dodaj riječi
                </Button>
            </Stack>

            {
                (wordsInDictionary.length === 0)
                    ? <Typography variant="h6" color="gray"> Odabrani rječnik je prazan </Typography>
                    : <TableWrapper>
                        <EditDictionaryTable />
                    </TableWrapper>
            }

        </Container>
    );
}
export default EditDictionary;
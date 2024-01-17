import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { clearWordsNotInDict } from "../../redux/slices/wordsSlice";
import { addWordsToDictionary } from "../../redux/slices/wordsSlice"
import { FormTitleWrapper, FormWrapper } from "../../components/common/styled";
import route from "../../constants/route";
import words from "../../services/api/routes/words";


const AddWords = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedWordIDs, setSelectedWordIDs] = useState<number[]>([]);
    const { wordsNotInDictionary, wordsInDictionary } = useSelector((state: RootState) => state.words);
    const { selectedDictionary } = useSelector((state: RootState) => state.dictionaries);
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (selectedDictionary !== undefined && submitted) {
            navigate(`/${route.editDictionary}/${selectedDictionary.dictionaryid}`);
        }
    }, [wordsInDictionary]);

    var columns: GridColDef[] = [
        // { field: "id", headerName: "ID", flex: 1 },
        { field: "word", headerName: "Riječ", flex: 1 },
        { field: "translation", headerName: "Prijevod", flex: 1 },
    ]

    var rows = wordsNotInDictionary.map(el => ({
        id: el.wordid,
        word: el.croatianname,
        translation: el.foreignname,
    }));

    const handleRowSelection = (newSelection: GridRowSelectionModel) => {
        const selectedIDs = newSelection as (string | number)[];
        const numericIDs = selectedIDs.filter((el) => typeof el === 'number') as number[];
        setSelectedWordIDs(numericIDs);
    }

    const handleCancel = () => {
        if (selectedDictionary !== undefined) {
            navigate(`/${route.editDictionary}/${selectedDictionary.dictionaryid}`);
            dispatch(clearWordsNotInDict());
        }
    }

    const handleConfirm = () => {
        if (selectedDictionary !== undefined) {
            dispatch(addWordsToDictionary({ dictionaryid: selectedDictionary?.dictionaryid, wordids: selectedWordIDs }));
            dispatch(clearWordsNotInDict());
            setSubmitted(true);
        }
    }

    return (
        <Container maxWidth="md">
            <Box padding="2em"></Box>
            <FormWrapper>
                <FormTitleWrapper>
                    <Typography component="h1" variant="h5">
                        Odaberite riječi koje želite dodati u rječnik "{selectedDictionary?.dictionaryname.toLocaleUpperCase()}"
                    </Typography>
                </FormTitleWrapper>

                {wordsNotInDictionary.length == 0
                    ? <Typography variant="h6" color="gray">Sve riječi su već u rječniku</Typography>
                    : <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={{
                            marginTop: "1em",
                            width: "100%"
                        }}
                        onRowSelectionModelChange={(newSelectionModel) => {
                            handleRowSelection(newSelectionModel);
                        }}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                }


                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-between"}
                    width="100%"
                    gap={2}
                    marginTop={"2.5em"}
                >
                    <Button variant="outlined" fullWidth onClick={handleCancel}>Odustani</Button>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleConfirm}
                        disabled={selectedWordIDs.length == 0}
                    >
                        Dodaj riječi
                    </Button>
                </Box>
            </FormWrapper>
        </Container>
    );
}

export default AddWords;

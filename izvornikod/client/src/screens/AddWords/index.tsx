import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchWordsNotInDictionary } from "../../redux/slices/wordsSlice";
import { addWordsToDictionary } from "../../redux/slices/dictionariesSlice"
import AddWordsToDictionaryInput from "../../types/inputs/dictionary/AddWordsToDictInput";
import { useNavigate } from "react-router-dom";
import route from "../../constants/route";

const AddWords = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedWordIDs, setSelectedWordIDs] = useState<number[]>([]);
    const wordsNotInDictionary = useSelector((state: RootState) => state.words.wordsNotInDictionary);
    const { selectedDictionary } = useSelector((state: RootState) => state.dictionaries);

    const SendToBack= (data: AddWordsToDictionaryInput) => {
        dispatch(addWordsToDictionary(data))
        console.log("SENDIT");
    };

    var columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "word", headerName: "Riječ", flex: 1 },
        { field: "translation", headerName: "Prijevod", flex: 1 }
    ]

    var rows = wordsNotInDictionary.map(el => ({
        id: el.wordid,
        word: el.foreignname,
        translation: el.croatianname
    }))

    var temp_rows = [
        { id: 34, word: "window", translation: "prozor" },
        { id: 35, word: "love", translation: "ljubav" },
        { id: 36, word: "beauty", translation: "ljepota" }
    ]   // Ovo cemo kasnije skloniti to je cisto da malo popuni ako nemate u bazi

    temp_rows.forEach(el => { rows.push(el) })

    const handleRowSelection = (newSelection: GridRowSelectionModel) => {
        const selectedIDs = newSelection as (string | number)[];
        const numericIDs = selectedIDs.filter((el) => typeof el === 'number') as number[];
        setSelectedWordIDs(numericIDs);
    };

    useEffect(() => { console.log(selectedWordIDs); }, [selectedWordIDs]);

    // Samo se vratimo nazad na edit dicitonary pomocu dictionary id
    function handleCancel() {
        navigate(`/${route.editDictionary}/${selectedDictionary?.dictionaryid}`);
    }

    // dodamo rijeci i onda se vratimo nazad na edit dictionary da se vidi da su rijeci dodane
    // Samo sto se ne vidi da su rijeci dodane, na prvi navigate, ne znam zasto
    function handleConfirm() {
        var data: AddWordsToDictionaryInput = { dictionaryid: selectedDictionary?.dictionaryid, wordids: selectedWordIDs }
        SendToBack(data)
        console.log('The IDs: ' + selectedWordIDs + 'The dictionaryId:' + selectedDictionary?.dictionaryid)
        navigate(`/${route.editDictionary}/${selectedDictionary?.dictionaryid}`);
    }

    return (
        <Container maxWidth="md">
            <Box 
                margin={"auto"} bgcolor={"rgb(188, 232, 218)"} 
                maxHeight="md" padding={"5em"} borderRadius={"20px"} 
                marginTop={"0.5em"}
            >
                <Typography component="h1" variant="h5">Odaberite riječi koje nisu u rječniku za dodati: </Typography>

                {wordsNotInDictionary.length == 0 ?
                    <Typography component="h1" variant="h5" color="gray">Sve riječi su u rječniku!. </Typography> :
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={{
                            marginTop: "1em",
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
                    marginTop={"2em"}
                >
                    <Button variant="contained" sx={{ width: "48%", justifyContent: "flex-end" }} onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" sx={{ width: "48%", justifyContent: "flex-end" }} onClick={handleConfirm}>Add them words</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AddWords;

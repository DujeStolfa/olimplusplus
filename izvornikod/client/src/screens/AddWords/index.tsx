import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchWordsNotInDictionary } from "../../redux/slices/wordsSlice";

const AddWords = () => {
    const dispatch = useAppDispatch();
    const [selectedWordIDs, setSelectedWordIDs] = useState<number[]>([]);
    const wordsNotInDictionary = useSelector((state: RootState) => state.words.wordsNotInDictionary); // Ovo je nadam se tocno
    const { selectedDictionary } = useSelector((state: RootState) => state.dictionaries);

    var columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "word", headerName: "Word", flex: 1 },
        { field: "translation", headerName: "Translation", flex: 1 }
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

    function handleCancel() {
        alert("Handle Cancel")
    }

    function handleConfirm() {
        alert("Handle confirm, send that to the dictionary in the back")
        console.log(selectedWordIDs)
    }

    return (

        <Container maxWidth="md">
            <Box margin={"auto"} bgcolor={"rgb(188, 232, 218)"} maxHeight="md" padding={"5em"} marginTop="3em">
                <Typography component="h1" variant="h5">We gon be ading words with this one boys! </Typography>

                {wordsNotInDictionary.length == 0 ?
                    <Typography component="h1" variant="h5" color="gray">All the words are in the dicitonary. </Typography> :
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
                            borderColor: "black",
                            '.MuiDataGrid-columnHeaders': {
                                bgcolor: "rgb(46, 154, 176)"
                            },
                            '.MuiDataGrid-toolbarContainer': {
                                bgcolor: "rgb(46, 154, 176)"    // treba poraditi na boji, al otom potom
                            }
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

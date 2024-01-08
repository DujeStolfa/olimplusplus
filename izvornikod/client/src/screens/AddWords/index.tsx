import React, { useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography, Box} from "@mui/material"; // Yoink Dujinog koda i importa iz Logina

var columns: GridColDef[] = [
    {field: "id", headerName: "ID"},
    {field: "word", headerName: "Word"},
    {field: "translation", headerName: "Translation"}
]

var rows = [
    {id: 1, word: "Desk", translation: "Stol"},
    {id: 2,word: "Edge", translation: "Ivica"},
    {id: 3,word: "Pot", translation: "Marica"}
]

const AddWords = () => {

    return (
    
        <Container maxWidth="md">
            <Box margin={"auto"} bgcolor={"rgb(188, 232, 218)"} maxHeight="md" padding={"5em"} marginTop="3em">
                <Typography component="h1" variant="h5">We gon be ading words with this one boys! </Typography>

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
                />

                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-between"}
                    width="100%"
                    marginTop={"2em"}
                >
                    <Button variant="contained" sx={{ width: "48%", justifyContent: "flex-end"}}>Cancel</Button>
                    <Button variant="contained" sx={{ width: "48%", justifyContent: "flex-end" }}>Add them words</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AddWords; // export default znaci da je ovo entrypoint
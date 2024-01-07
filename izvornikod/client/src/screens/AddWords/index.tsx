import React, { useEffect } from "react";
import WordAddMenu from "./WordAddMenu";
import { Button, Container, Stack, Typography, Box, TextField} from "@mui/material"; // Yoink Dujinog koda i importa iz Logina

const AddWords = () => {

    return (
    
        <Container maxWidth="md">
            <Box margin={"auto"} bgcolor={"rgb(188, 232, 218)"} maxHeight="md" padding={"5em"} marginTop="3em">
                <Typography component="h1" variant="h5">We gon be ading words with this one boys! </Typography>

                <WordAddMenu wordNum = {1} ></WordAddMenu>
                <WordAddMenu wordNum = {2} ></WordAddMenu>

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
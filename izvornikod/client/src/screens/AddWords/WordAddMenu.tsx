import React, { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Typography, Box, TextField, createTheme, Accordion, AccordionDetails, AccordionSummary} from "@mui/material"; // Yoink Dujinog koda i importa iz Logina
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { lime, purple } from "@mui/material/colors";

const theme = createTheme({
    palette: {
      primary: lime,
      secondary: purple,
    },
  });

const WordAddMenu = () => {

    return (
        <Box marginTop={"1em"} marginBottom={"1em"}>
            <Typography>Word 1</Typography>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx = {{ display: "flex"}}
                >
                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-between"}
                    width="100%"
                    >
                    <TextField id="outlined-basic" label="Word" variant="outlined" sx={{ width: "48%" }}/>
                    <TextField id="outlined-basic" label="Translation" variant="outlined" sx={{ width: "48%" }}/>
                </Box>
                 </AccordionSummary>
                <AccordionDetails>
                    <TextField id="outlined-basic" label="Phrase" variant="outlined" sx={{ width: "100%", marginBottom: "1em"}}/>
                    <Button variant="contained" startIcon={<VolumeUpIcon />}>Upload Audio</Button>
                </AccordionDetails>
                </Accordion>
            
        </Box>
    );
}


export default WordAddMenu
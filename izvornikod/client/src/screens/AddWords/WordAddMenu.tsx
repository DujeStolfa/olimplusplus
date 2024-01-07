import React, { useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Typography, Box, TextField, createTheme, Accordion, AccordionDetails, AccordionSummary} from "@mui/material"; // Yoink Dujinog koda i importa iz Logina
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { lime, purple } from "@mui/material/colors";

function handleClick(){
    alert("Open up a dialog box for uploading audio")
    console.log("Open up a dialog box for uploading audio")
}

function WordAddMenu(props: { wordNum: number; }) {

    const [changed, setChanged] = useState(false)
    const [word, setWord] = useState("")
    const [translation, setTranslation] = useState("")
    const [phrase, setPhrase] = useState("")


    return (
        <Box marginTop={"1em"} marginBottom={"1em"}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                <Typography>{changed ? word + " (eng) => " + translation + " (hrv)": "Word " + props.wordNum}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        display={"flex"}
                        flexDirection="row"
                        justifyContent={"space-between"}
                        width="100%"
                        marginBottom={"1em"}
                        >
                        <TextField id="outlined-basic" label="Word" variant="outlined" sx={{ width: "48%" }} 
                        onChange = {
                            (e) => {
                                if(e.target.value === ""){
                                    setWord(e.target.value);
                                    setChanged(false);
                                    return; 
                                }
                                setWord(e.target.value); 
                                setChanged(true);
                            }
                        }
                        />
                        <TextField id="outlined-basic" label="Translation" variant="outlined" sx={{ width: "48%" }}
                        onChange = {
                            (e) => {
                                if(e.target.value === ""){
                                    setTranslation(e.target.value);
                                    setChanged(false);
                                    return; 
                                }
                                setTranslation(e.target.value); 
                                setChanged(true);
                            }
                        }/>
                    </Box>
                    <TextField id="outlined-basic" label="Phrase" variant="outlined" sx={{ width: "100%", marginBottom: "1em"}}
                        onChange = {
                            (e) => {
                                setPhrase(e.target.value); 
                            }
                        }
                    />
                    <Button variant="contained" startIcon={<VolumeUpIcon />} onClick={ handleClick }>Upload Audio</Button>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}


export default WordAddMenu
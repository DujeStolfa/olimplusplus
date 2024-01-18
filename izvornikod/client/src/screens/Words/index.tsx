import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';

import { TableHeading, TableWrapper } from "../../components/common/styled";
import { RootState } from "../../redux/store";
import route from "../../constants/route";
import WordsTable from "./WordsTable";


const Words = () => {
  const navigate = useNavigate();
  const { words } = useSelector((state: RootState) => state.words);

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <TableHeading variant="h2">Riječi</TableHeading>

        <Button
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/${route.createWord}`)}
        >
          Dodaj riječ
        </Button>
      </Stack>


      {(words.length === 0)
        ? <Typography variant="h6" color="gray"> Odabrani jezik nema dostupnih riječi </Typography>
        : <TableWrapper>
          <WordsTable />
        </TableWrapper>
      }

    </Container>
  );
}

export default Words;
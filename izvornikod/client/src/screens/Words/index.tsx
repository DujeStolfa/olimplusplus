import React from "react";
import { Button, Container, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { TableHeading, TableWrapper } from "../../components/common/styled";
import WordsTable from "./WordsTable";
import route from "../../constants/route";
import { useNavigate } from "react-router-dom";

const Words = () => {
  const navigate = useNavigate();

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

      <TableWrapper>
        <WordsTable />
      </TableWrapper>
    </Container>
  );
}

export default Words;
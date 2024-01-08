import React from "react";
import { Button, Container, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { TableHeading, TableWrapper } from "../../components/common/styled";
import DictionariesTable from "./DictionariesTable";

const Dictionaries = () => {

  return (
    <Container>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <TableHeading variant="h2">Rječnici</TableHeading>

        <Button
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => console.log("create dictionary")}
        >
          Dodaj rječnik
        </Button>
      </Stack>

      <TableWrapper>
        <DictionariesTable />
      </TableWrapper>
    </Container>
  );
}

export default Dictionaries;
import React from "react";
import { Button, Container, Stack } from "@mui/material";
import { TableHeading, TableWrapper } from "../../components/common/styled";
import DictionariesTable from "./DictionariesTable";
import CreateDictionaryForm from "./CreateDictionaryForm";


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
        <CreateDictionaryForm />
      </Stack>

      <TableWrapper>
        <DictionariesTable />
      </TableWrapper>

    </Container>
  );
}

export default Dictionaries;
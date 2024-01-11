import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { TableHeading, TableWrapper } from "../../components/common/styled";
import DictionariesTable from "./DictionariesTable";
import CreateDictionaryForm from "./CreateDictionaryForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const Dictionaries = () => {
  const { dictionaries } = useSelector((state: RootState) => state.dictionaries);

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

      {
        (dictionaries.length == 0)
          ? <Typography variant="h6" color="gray"> Odabrani jezik nema dostupnih rječnika </Typography>
          : <TableWrapper>
            <DictionariesTable />
          </TableWrapper>
      }

    </Container>
  );
}

export default Dictionaries;
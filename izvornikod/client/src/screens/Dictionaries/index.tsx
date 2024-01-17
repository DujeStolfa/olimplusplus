import React from "react";
import { useSelector } from "react-redux";
import { Container, Stack, Typography } from "@mui/material";
import { TableHeading, TableWrapper } from "../../components/common/styled";
import { RootState } from "../../redux/store";
import DictionariesTable from "./DictionariesTable";
import CreateDictionaryForm from "./CreateDictionaryForm";


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
        (dictionaries.length === 0)
          ? <Typography variant="h6" color="gray"> Odabrani jezik nema dostupnih rječnika </Typography>
          : <TableWrapper>
            <DictionariesTable />
          </TableWrapper>
      }

    </Container>
  );
}

export default Dictionaries;
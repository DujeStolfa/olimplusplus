import React from "react";
import { Container } from "@mui/material";

import { TableHeading, TableWrapper } from "../../components/common/styled";
import DictionariesTable from "./DictionariesTable";

const Dictionaries = () => {

  return (
    <Container>
      <TableHeading variant="h2">Rječnici</TableHeading>

      <TableWrapper>
        <DictionariesTable />
      </TableWrapper>
    </Container>
  );
}

export default Dictionaries;
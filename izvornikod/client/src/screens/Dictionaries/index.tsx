import React from "react";
import { Container } from "@mui/material";

import { TableHeading, TableWrapper } from "../../components/common/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dictionaries = () => {
  const { dictionaries } = useSelector((state: RootState) => state.dictionaries);

  return (
    <Container>
      <TableHeading variant="h2">Rječnici</TableHeading>

      <TableWrapper>
        {dictionaries.map(el => <div> {el.dictionaryname}</div>)}
      </TableWrapper>
    </Container>
  );
}

export default Dictionaries;
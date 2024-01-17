import styled from 'styled-components';

import { Box, Paper } from '@mui/material';

export const DictionaryGridWrapper = styled(Box)`
  display: flex;  
  flex-direction: row; 
  flex-wrap: wrap; 
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1.5em;
`;

export const DictionaryCardWrapper = styled(Paper)`
  padding: 1em;
  min-width: 300px;
`

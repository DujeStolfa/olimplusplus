import { ScreenWrapper } from "../Login/index.styled";
import { Button, Container, Stack, Typography} from "@mui/material";

const SelectLanguage = () => {

  return (
      <ScreenWrapper>
          <Container maxWidth="xs">
              <Typography component="h1" fontSize={35}>Odaberite jezik</Typography>
              <br />
              <Stack direction="column" spacing={2}>
                  <Button size="large">Jezik 1</Button>
                  <Button size="large">Jezik 2</Button>
                  <Button size="large">Jezik 3</Button>
                  <Button size="large">Jezik 4</Button>
                  <Button size="large">Jezik 5</Button>
              </Stack>
          </Container>
      </ScreenWrapper>
  );
}

export default SelectLanguage;

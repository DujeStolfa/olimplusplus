import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import CheckIcon from '@mui/icons-material/Check';

import { useAppDispatch } from "../../redux/store";
import { renameWord } from "../../redux/slices/wordsSlice";
import RenameWordInput from "../../types/inputs/word/RenameWordInput";
import CRUD_ACTION from "../../types/enums/CrudAction";
import Word from "../../types/models/Word";

interface Props {
  word: Word;
  setRenameState: Dispatch<SetStateAction<CRUD_ACTION>>;
}

const RenameWordForm = ({ word, setRenameState }: Props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, formState: { isSubmitSuccessful } } = useForm<RenameWordInput>({
    defaultValues: {
      croatianname: word.croatianname,
    }
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setRenameState(CRUD_ACTION.READ);
    }
  }, [formState]);

  const onSubmit = (data: RenameWordInput) => {
    if (data.croatianname !== word.croatianname) {
      dispatch(renameWord({
        wordid: word.wordid,
        croatianname: data.croatianname,
      }));
    }
  };

  return (
    <ClickAwayListener onClickAway={() => {
      setRenameState(CRUD_ACTION.READ);
    }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} >
        <TextField
          {...register("croatianname")}
          label="Naziv riječi"
          autoComplete="off"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
          }}
          required
          autoFocus
          fullWidth
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton type="submit" size="small" edge="end" >
                  <CheckIcon color="primary" />
                </IconButton>
              </InputAdornment>
          }}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default RenameWordForm;
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import CheckIcon from '@mui/icons-material/Check';

import { useAppDispatch } from "../../redux/store";
import { renameDictionary } from "../../redux/slices/dictionariesSlice";
import RenameDictionaryInput from "../../types/inputs/dictionary/RenameDictionaryInput";
import CRUD_ACTION from "../../types/enums/CrudAction";
import Dictionary from "../../types/models/Dictionary";

interface Props {
  dictionary: Dictionary;
  setRenameState: Dispatch<SetStateAction<CRUD_ACTION>>;
}

const RenameDictionaryForm = ({ dictionary, setRenameState }: Props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, formState: { isSubmitSuccessful } } = useForm<RenameDictionaryInput>({
    defaultValues: {
      dictionaryname: dictionary.dictionaryname,
    }
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setRenameState(CRUD_ACTION.READ);
    }
  }, [formState]);

  const onSubmit = (data: RenameDictionaryInput) => {
    if (data.dictionaryname !== dictionary.dictionaryname) {
      dispatch(renameDictionary({
        dictionaryid: dictionary.dictionaryid,
        dictionaryname: data.dictionaryname,
      }));
    }
  };

  return (
    <ClickAwayListener onClickAway={() => {
      setRenameState(CRUD_ACTION.READ);
    }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} >
        <TextField
          {...register("dictionaryname")}
          label="Naziv rječnika"
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

export default RenameDictionaryForm;
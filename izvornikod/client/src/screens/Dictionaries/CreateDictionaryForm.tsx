import React, { useEffect } from "react";
import { Box, Button, ClickAwayListener, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { createDictionary, setCreateFormState } from "../../redux/slices/dictionariesSlice";
import CreateDictionaryInput from "../../types/inputs/dictionary/CreateDictionaryInput";
import { RootState, useAppDispatch } from "../../redux/store";
import CRUD_ACTION from "../../types/enums/CrudAction";


const CreateDictionaryForm = () => {
  const dispatch = useAppDispatch();
  const { createFormState } = useSelector((state: RootState) => state.dictionaries);
  const { selectedLanguage } = useSelector((state: RootState) => state.languages);
  const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm<CreateDictionaryInput>();

  const onSubmit = (data: CreateDictionaryInput) => {
    if (selectedLanguage !== undefined) {
      dispatch(createDictionary({ ...data, languageid: selectedLanguage.languageid }));
      dispatch(setCreateFormState(CRUD_ACTION.READ));
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ dictionaryname: "" });
    }
  }, [formState, reset]);

  if (createFormState === "read") {
    return (
      <Button
        variant="outlined"
        size="large"
        startIcon={<AddIcon />}
        onClick={() => dispatch(setCreateFormState(CRUD_ACTION.CREATE))}
      >
        Dodaj rječnik
      </Button>
    );
  }

  return (
    <ClickAwayListener onClickAway={() => {
      reset({ dictionaryname: "" });
      return dispatch(setCreateFormState(CRUD_ACTION.READ));
    }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("dictionaryname")}
          variant="outlined"
          label="Naziv rječnika"
          autoComplete="off"
          required
          autoFocus
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton type="submit" size="large" edge="end">
                  <CheckIcon color="primary" />
                </IconButton>
              </InputAdornment>
          }}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default CreateDictionaryForm;

import React, { Dispatch, SetStateAction, useState } from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dictionary from "../../types/models/Dictionary";
import CRUD_ACTION from "../../types/enums/CrudAction";
import RenameDictionaryForm from "./RenameDictionaryForm";
import route from "../../constants/route";
import { useAppDispatch } from "../../redux/store";
import { selectDictionary } from "../../redux/slices/dictionariesSlice";

interface Props {
  dictionary: Dictionary;
  setSelectedDictionary: Dispatch<SetStateAction<Dictionary | undefined>>;
}

const DictionariesTableRow = ({ setSelectedDictionary, dictionary }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [renameState, setRenameState] = useState<CRUD_ACTION>(CRUD_ACTION.READ);

  return (
    <TableRow
      hover
      onClick={() => {
        dispatch(selectDictionary(dictionary));
        navigate(`/${route.editDictionary}/${dictionary.dictionaryid}`);
      }}
    >
      <TableCell>
        {
          renameState !== CRUD_ACTION.EDIT
            ? dictionary.dictionaryname
            : <RenameDictionaryForm dictionary={dictionary} setRenameState={setRenameState} />
        }
      </TableCell>

      <TableCell>
        {
          (new Date(dictionary.dictionarycreatedat + "Z")).toLocaleDateString("hr-HR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }
      </TableCell>
      <TableCell>{dictionary.dictionarysize}</TableCell>
      <TableCell align="right">
        <IconButton
          size="small"
          onClick={(event) => {
            setRenameState(CRUD_ACTION.EDIT);
            event.stopPropagation();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={(event) => {
            setSelectedDictionary(dictionary);
            event.stopPropagation();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default DictionariesTableRow;
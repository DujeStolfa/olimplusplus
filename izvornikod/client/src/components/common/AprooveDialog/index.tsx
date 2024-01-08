import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleExit: () => void;
}

const ApproveDialog = ({ open, title, text, cancelText, confirmText, handleCancel, handleConfirm, handleExit }: Props) => {

  return (
    <Dialog
      open={open}
      onClose={() => handleCancel()}
      maxWidth="xs"
      fullWidth
      onTransitionExited={() => handleExit()}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="secondary" onClick={() => handleCancel()}>
          {cancelText || "No"}
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleConfirm()}>
          {confirmText || "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApproveDialog;
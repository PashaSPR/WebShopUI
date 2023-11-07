import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function MessageEmptyFieldModal({ open, onClose, dialogText }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Повідомлення</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MessageEmptyFieldModal;

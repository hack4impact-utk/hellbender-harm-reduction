import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface CertPUpProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
}

export function CertificationPopUp({
  open,
  onClose,
  onSubmit,
  title,
  description,
}: CertPUpProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        variant="h3"
        sx={{ padding: '25px', fontFamily: 'Verdana', color: '#42603c' }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
        <Button onClick={onSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

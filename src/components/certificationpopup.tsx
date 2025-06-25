import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
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
        sx={{
          padding: '25px',
          fontFamily: 'Verdana',
          fontWeight: 'bold',
          color: '#42603c',
          backgroundColor: '#e2e7e2',
          textAlign: 'center',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#e2e7e2' }}>
        <Box sx={{ backgroundColor: '#f0f5ef', p: '4%', borderRadius: '10px' }}>
          <DialogContentText variant="h6">{description}</DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#e2e7e2', pb: '2%', pr: '3%' }}>
        <Button
          onClick={onClose}
          autoFocus
          sx={{ color: '#42603c', fontFamily: 'Verdana', fontSize: '100%' }}
        >
          Close
        </Button>
        <Button
          onClick={onSubmit}
          autoFocus
          sx={{ color: '#42603c', fontFamily: 'Verdana', fontSize: '100%' }}
        >
          Request
        </Button>
      </DialogActions>
    </Dialog>
  );
}

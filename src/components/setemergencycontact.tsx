'use client';
import { TextField, Stack, Typography } from '@mui/material';

export function SetEmergencyContact() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" align="center">
        Who Can We Contact in Case of an Emergency?
      </Typography>
      <br></br>
      <Typography variant="body1">Name</Typography>
      <TextField
        required
        variant="filled"
        sx={{
          backgroundColor: '#4d6a48',
        }}
      ></TextField>
      <br></br>
      <Typography variant="body1">Phone Number</Typography>
      <TextField
        required
        variant="filled"
        sx={{
          backgroundColor: '#4d6a48',
        }}
      ></TextField>
    </Stack>
  );
}

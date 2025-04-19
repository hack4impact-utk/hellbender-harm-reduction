'use client';
import { TextField, Stack, Typography } from '@mui/material';

export function SetEmergencyContact() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" align="center">
        Who Can We Contact in Case of an Emergency?
      </Typography>
      <br></br>
      <Typography variant="body1">Name</Typography>
      <TextField variant="outlined" required></TextField>
      <br></br>
      <Typography variant="body1">Phone Number</Typography>
      <TextField variant="outlined" required></TextField>
    </Stack>
  );
}

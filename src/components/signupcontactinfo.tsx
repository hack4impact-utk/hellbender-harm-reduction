'use client';
import { TextField, Stack, Typography } from '@mui/material';

export function SignUpContactInfo() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" align="center">
        How Can We Contact You?
      </Typography>
      <br></br>
      <Typography variant="body1">Phone Number</Typography>
      <TextField variant="outlined" required></TextField>
      <br></br>
      <Typography variant="body1">Email</Typography>
      <TextField variant="outlined" required></TextField>
    </Stack>
  );
}

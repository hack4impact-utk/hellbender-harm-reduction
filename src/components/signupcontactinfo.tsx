'use client';
import { TextField, Stack, Typography } from '@mui/material';

export function SignUpContactInfo() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" align="center">
        How Can We Contact You?
      </Typography>
      <br></br>
      <Typography variant="body1">Phone Number</Typography>
      <TextField
        variant="filled"
        required
        sx={{
          backgroundColor: '#4d6a48',
        }}
      ></TextField>
      <br></br>
      <Typography variant="body1">Email</Typography>
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

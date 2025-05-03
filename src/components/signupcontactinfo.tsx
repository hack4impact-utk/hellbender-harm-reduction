'use client';
import { TextField, Stack, Typography } from '@mui/material';

export interface SignUpContactInfoProps {
  data: {
    phone: string;
    email: string;
  };
  onChange: (updated: Partial<SignUpContactInfoProps['data']>) => void;
}

export function SignUpContactInfo({ data, onChange }: SignUpContactInfoProps) {
  return (
    <Stack spacing={2} sx={{ '& .MuiInputBase-input': { color: '#ffffff' } }}>
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
        value={data.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
      ></TextField>
      <br></br>
      <Typography variant="body1">Email</Typography>
      <TextField
        required
        variant="filled"
        sx={{
          backgroundColor: '#4d6a48',
        }}
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
      ></TextField>
    </Stack>
  );
}

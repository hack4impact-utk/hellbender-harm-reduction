'use client';
import { TextField, Stack, Typography } from '@mui/material';

export interface SetEmergencyContactProps {
  data: {
    ecName: string;
    ecPhone: string;
  };
  onChange: (updated: Partial<SetEmergencyContactProps['data']>) => void;
}

export function SetEmergencyContact({
  data,
  onChange,
}: SetEmergencyContactProps) {
  return (
    <Stack spacing={2} sx={{ '& .MuiInputBase-input': { color: '#ffffff' } }}>
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
        value={data.ecName}
        onChange={(e) => onChange({ ecName: e.target.value })}
      ></TextField>
      <br></br>
      <Typography variant="body1">Phone Number</Typography>
      <TextField
        required
        variant="filled"
        sx={{
          backgroundColor: '#4d6a48',
        }}
        value={data.ecPhone}
        onChange={(e) => onChange({ ecPhone: e.target.value })}
      ></TextField>
    </Stack>
  );
}

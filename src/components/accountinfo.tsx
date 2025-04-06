'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import { TextField, Stack, Typography } from '@mui/material';

interface AccountInfoProps {
  email: string;
  phone: string;
}

export function AccountInfo(props: AccountInfoProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h3"> Email </Typography>
      <TextField disabled defaultValue={props.email} />
      <Typography variant="h3"> Phone Number </Typography>
      <TextField disabled defaultValue={props.phone} />
    </Stack>
  );
}

'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import { TextField, Stack } from '@mui/material';

interface AccountInfoProps {
  email: string;
  phone: string;
}

export function AccountInfo(props: AccountInfoProps) {
  return (
    <Stack spacing={2}>
      <h3>Email</h3>
      <TextField disabled defaultValue={props.email} />
      <h3>Phone Number</h3>
      <TextField disabled defaultValue={props.phone} />
    </Stack>
  );
}

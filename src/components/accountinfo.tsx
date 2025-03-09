'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import hhrColors from '@/utils/hhr-theme';
import { Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountInfoTextField } from '@/utils/customTextField';

interface AccountInfoProps {
  email: string;
  phone: string;
}

export function AccountInfo(props: AccountInfoProps) {
  return (
    <Stack spacing={2}>
      <Typography alignSelf={'flex-end'} variant="h5" color="white">
        Contact Information
      </Typography>
      <Typography variant="h4" color="white">
        Email
      </Typography>
      <AccountInfoTextField
        disabled
        defaultValue={props.email}
        sx={{
          backgroundColor: alpha(hhrColors.palette.hhr.main, 0.75),
        }}
      />
      <Typography variant="h4" color="white">
        Phone Number
      </Typography>
      <AccountInfoTextField
        disabled
        defaultValue={props.phone}
        sx={{
          backgroundColor: alpha(hhrColors.palette.hhr.main, 0.75),
        }}
      />
    </Stack>
  );
}

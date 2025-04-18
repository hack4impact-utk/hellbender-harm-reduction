import { Avatar, TextField, Stack } from '@mui/material';

interface userInfoProps {
  profilePicture: string;
  name: string;
  pronouns: string;
}

// Uses a stack for natural vertical formatting
// The id attribute for the TextFields can be changed to better fit our style
// Remove the disabled attribute when it's time to allow the fields to be edited
export function UserInfo(props: userInfoProps) {
  return (
    <Stack spacing={2} alignItems="center">
      <Avatar
        alt={props.name}
        src={props.profilePicture}
        sx={{ width: 200, height: 200 }}
      />
      <TextField
        disabled
        id="outlined-basic"
        defaultValue={props.name}
        inputProps={{ min: 0, style: { textAlign: 'center' } }}
      />
      <TextField
        disabled
        id="outlined-basic"
        defaultValue={props.pronouns}
        inputProps={{ min: 0, style: { textAlign: 'center' } }}
      />
    </Stack>
  );
}

import hhrColors from '@/utils/hhr-theme';
import { Avatar, Stack } from '@mui/material';
import { alpha, ThemeProvider } from '@mui/material/styles';
import { UserInfoTextField } from '@/utils/customTextField';

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
    <ThemeProvider theme={hhrColors}>
      <Stack spacing={2} alignItems="center">
        <Avatar
          alt={props.name}
          src={props.profilePicture}
          sx={{ width: '70%', height: '70%' }}
        />
        <UserInfoTextField
          disabled
          id="outlined-basic"
          defaultValue={props.name}
          inputProps={{
            min: 0,
            style: { textAlign: 'center' },
          }}
          sx={{
            backgroundColor: alpha(hhrColors.palette.hhr.main, 0.75),
          }}
        ></UserInfoTextField>
        <UserInfoTextField
          disabled
          id="outlined-basic"
          defaultValue={props.pronouns}
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
          sx={{ backgroundColor: alpha(hhrColors.palette.hhr.main, 0.75) }}
        />
      </Stack>
    </ThemeProvider>
  );
}

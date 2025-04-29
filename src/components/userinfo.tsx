import { Typography } from '@mui/material';
import { Avatar, Stack, Box } from '@mui/material';

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
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        alt={props.name}
        src={props.profilePicture}
        sx={{
          width: '60%',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <Box
        sx={{
          height: '12%',
          width: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#42603c',
          borderRadius: '10px',
        }}
      >
        <Typography
          fontSize="20px"
          fontFamily="Verdana"
          sx={{ color: '#f0f5ef' }}
        >
          {props.name}
        </Typography>
      </Box>
      <Box
        sx={{
          height: '12%',
          width: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#42603c',
          borderRadius: '10px',
        }}
      >
        <Typography
          fontSize="20px"
          fontFamily="Verdana"
          sx={{ color: '#f0f5ef' }}
        >
          {props.pronouns}
        </Typography>
      </Box>
    </Stack>
  );
}

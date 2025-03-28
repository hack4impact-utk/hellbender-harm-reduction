'use client';
import {
  Stack,
  Typography,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from '@mui/material';

export function SetNewEventNotif() {
  return (
    <Stack
      spacing={2}
      textAlign={'center'}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Want to Know About New Events?</Typography>
      <br />
      <Typography variant="h5">New Events</Typography>
      <FormLabel id="demo-radio-buttons-group-label">
        I want email notifications for...
      </FormLabel>
      <RadioGroup
        defaultValue="Never"
        name="neweventnotifs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <FormControlLabel
          value="All New Events"
          control={<Radio />}
          label="All New Events"
        />
        <FormControlLabel
          value="New Events I Prefer"
          control={<Radio />}
          label="New Events I Prefer"
        />
        <FormControlLabel value="Never" control={<Radio />} label="Never" />
      </RadioGroup>
    </Stack>
  );
}

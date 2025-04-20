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
      <Typography variant="h5">Want to Know About New Events?</Typography>
      <br />
      <FormLabel id="demo-radio-buttons-group-label" sx={{ color: 'white' }}>
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
          value="Preferred New Events"
          control={<Radio />}
          label="Preferred New Events"
        />
        <FormControlLabel
          value="Never"
          control={<Radio />}
          label="No New Events"
        />
      </RadioGroup>
    </Stack>
  );
}

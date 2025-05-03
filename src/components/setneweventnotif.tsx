'use client';
import {
  Stack,
  Typography,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from '@mui/material';

interface SetNewEventNotifProps {
  data: string;
  onChange: (value: string) => void;
}

export function SetNewEventNotif({ data, onChange }: SetNewEventNotifProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

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
        defaultValue="No Events"
        value={data}
        name="neweventnotifs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onChange={handleChange}
      >
        <FormControlLabel
          value="All Events"
          control={<Radio />}
          label="All New Events"
        />
        <FormControlLabel
          value="Preferred Events"
          control={<Radio />}
          label="Preferred New Events"
        />
        <FormControlLabel
          value="No Events"
          control={<Radio />}
          label="No New Events"
        />
      </RadioGroup>
    </Stack>
  );
}

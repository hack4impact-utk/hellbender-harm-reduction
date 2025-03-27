'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import {
  Typography,
  Stack,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export function SetEventPref() {
  return (
    <Stack textAlign={'center'}>
      <Typography variant="h5">What Events Are You Interested In?</Typography>
      <br></br>
      <Grid container spacing={2} maxWidth={400} alignSelf={'center'}>
        <Grid item xs={6} textAlign={'left'}>
          <FormControlLabel
            control={<Checkbox />}
            label="Harm Reduction Services"
          />
          <br></br>
          <FormControlLabel control={<Checkbox />} label="Syringe Pick-Up" />
          <br></br>
          <FormControlLabel
            control={<Checkbox />}
            label="In-Kind Fundraising"
          />
        </Grid>
        <Grid item xs={6} textAlign={'left'}>
          <FormControlLabel control={<Checkbox />} label="Building Work Days" />
          <br></br>
          <FormControlLabel control={<Checkbox />} label="Fundraising" />
          <br></br>
          <FormControlLabel control={<Checkbox />} label="Special Events" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Community Education and Advocacy"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

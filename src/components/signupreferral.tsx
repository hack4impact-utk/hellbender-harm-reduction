'use client';
import {
  Stack,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export function SignUpReferral() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign={'center'}>
        How Did You Hear About Us?
      </Typography>
      <Grid container spacing={2} maxWidth={400} alignSelf={'center'}>
        <Grid item xs={6} textAlign={'left'}>
          <FormControlLabel control={<Checkbox />} label="Word of Mouth" />
          <br></br>
          <FormControlLabel control={<Checkbox />} label="Event" />
          <br></br>
          <FormControlLabel control={<Checkbox />} label="Social Media" />
          <FormControlLabel
            control={<Checkbox />}
            label="Search Engine Result"
          />
        </Grid>
        <Grid item xs={6} textAlign={'left'}>
          <FormControlLabel control={<Checkbox />} label="School/University" />
          <br></br>
          <FormControlLabel control={<Checkbox />} label="Another Website" />
          <br></br>
          <FormControlLabel control={<Checkbox />} label="News/Newsletter" />
          <FormControlLabel control={<Checkbox />} label="Poster" />
        </Grid>
      </Grid>
    </Stack>
  );
}

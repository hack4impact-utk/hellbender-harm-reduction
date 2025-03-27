'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import React from 'react';
import {
  TextField,
  Stack,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

interface AddAccommodationsProps {
  userAccomms?: string[];
  otherAccomm?: string;
}

export function AddAccommodations({
  userAccomms = [],
  otherAccomm = '',
}: AddAccommodationsProps) {
  const accommodations = [
    'Accessible Parking',
    'Service Dogs Allowed',
    'Sensory Space',
    'Large Print',
    'Wheelchair Accessible',
    'Provided Seating',
    'No Heavy Lifting',
    'Flexible Breaks',
    'Blind',
    'Deaf',
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign={'center'}>
        Do You Need Accommodations While Volunteering?
      </Typography>
      <Grid container spacing={2} maxWidth={600} alignSelf={'center'}>
        <Grid item xs={6} textAlign={'left'}>
          {accommodations.slice(0, 5).map((label, index) => (
            <Box key={index}>
              <FormControlLabel
                key={label}
                control={<Checkbox checked={userAccomms.includes(label)} />}
                label={label}
              />
              <br />
            </Box>
          ))}
        </Grid>
        <Grid item xs={6} textAlign={'left'}>
          {accommodations.slice(5).map((label, index) => (
            <Box key={index}>
              <FormControlLabel
                control={<Checkbox checked={userAccomms.includes(label)} />}
                label={label}
              />
              <br></br>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography>Other: </Typography>
          <TextField
            value={otherAccomm}
            onChange={(e) =>
              console.log('Updated additional info:', e.target.value)
            } // Handle changes if needed
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

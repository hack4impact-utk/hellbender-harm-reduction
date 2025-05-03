'use client';
import React, { useEffect, useState } from 'react';
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
  data: {
    accomm: string[];
    otherAccomm: string;
  };
  onChange: (updated: { accomm: string[]; otherAccomm: string }) => void;
}

export function AddAccommodations({ data, onChange }: AddAccommodationsProps) {
  // Local state to manage which accommodations are checked
  const [checkedAccomms, setCheckedAccomms] = useState<string[]>(data.accomm);

  // Local state to manage the value of the "Other" text field
  const [otherText, setOtherText] = useState<string>(data.otherAccomm);

  // Push changes to parent
  useEffect(() => {
    onChange({ accomm: checkedAccomms, otherAccomm: otherText });
  }, [checkedAccomms, otherText]);

  // List of available accommodations
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

  // Toggle a label in the checked list
  const handleCheckboxChange = (label: string) => {
    setCheckedAccomms((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Update the local state when the "Other" text changes
  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherText(e.target.value);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        Do You Need Accommodations While Volunteering?
      </Typography>

      <Grid container spacing={2} maxWidth={600} alignSelf="center">
        <Grid item xs={6} textAlign="left">
          {accommodations.slice(0, 5).map((label) => (
            <Box key={label}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedAccomms.includes(label)}
                    onChange={() => handleCheckboxChange(label)}
                  />
                }
                label={label}
              />
            </Box>
          ))}
        </Grid>

        <Grid item xs={6} textAlign="left">
          {accommodations.slice(5).map((label) => (
            <Box key={label}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedAccomms.includes(label)}
                    onChange={() => handleCheckboxChange(label)}
                  />
                }
                label={label}
              />
            </Box>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography>Other:</Typography>
          <TextField
            value={otherText}
            onChange={handleOtherChange}
            fullWidth
            variant="filled"
            sx={{
              backgroundColor: '#4d6a48',
              '& .MuiInputBase-input': { color: '#ffffff' },
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

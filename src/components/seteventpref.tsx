'use client';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Stack,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface SetEventPrefProps {
  data: string[];
  onChange: (selectedEvents: string[]) => void;
}

export function SetEventPref({ data, onChange }: SetEventPrefProps) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>(data || []);

  useEffect(() => {
    setSelectedEvents(data || []);
  }, [data]);

  // Notify parent *only* when selectedEvents changes (not during render)
  useEffect(() => {
    onChange(selectedEvents);
  }, [selectedEvents]);

  const eventOptions = [
    'Harm Reduction Services',
    'Syringe Pick-Up',
    'In-Kind Fundraising',
    'Building Work Days',
    'Fundraising',
    'Special Events',
    'Community Education and Advocacy',
  ];

  const handleToggle = (eventLabel: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventLabel)
        ? prev.filter((item) => item !== eventLabel)
        : [...prev, eventLabel]
    );
  };

  return (
    <Stack textAlign="center">
      <Typography variant="h5">What Events Are You Interested In?</Typography>
      <Grid container spacing={2} alignSelf="center" mt={2} textAlign={'left'}>
        {eventOptions.slice(0, 6).map((label) => (
          <Grid item xs={6} key={label}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedEvents.includes(label)}
                  onChange={() => handleToggle(label)}
                />
              }
              label={label}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedEvents.includes(
                  'Community Education and Advocacy'
                )}
                onChange={() =>
                  handleToggle('Community Education and Advocacy')
                }
              />
            }
            label="Community Education and Advocacy"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

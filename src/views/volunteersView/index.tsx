'use client';
import { Typography, Box, Tab, Tabs } from '@mui/material';
import Topbar from '@/components/navbar';
import React, { useState } from 'react';

export default function VolunteersView() {
  const [selected, setSelected] = useState<number>(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newSelected: number
  ) => {
    setSelected(newSelected);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#E2E7E2',
        height: '100vh',
      }}
    >
      <Topbar />
      <Box>
        <Tabs value={selected} onChange={handleTabChange}>
          <Tab label="Metrics" />
          <Tab label="All Volunteers" />
          <Tab label="Volunteers By Events" />
        </Tabs>
        <Box>
          {selected === 0 && <Typography>Volunteer Metrics</Typography>}
          {selected === 1 && <Typography>All Volunteers</Typography>}
          {selected === 2 && <Typography>Volunteers By Events</Typography>}
        </Box>
      </Box>
    </Box>
  );
}

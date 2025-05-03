'use client';
import React from 'react';
import { Box } from '@mui/material';
import Navbar from '@/components/navbar';
import { EventList } from '@/components/eventlist';

interface Tags {
  _id: string;
  tagName: string;
}

interface EventViewProps {
  tags: Tags[];
}

export default function EventListView({ tags }: EventViewProps) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#E2E7E2',
      }}
    >
      <Navbar userType={'Admin'} userId={''} page={'Events'} />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          // Optional: scroll if EventList content is large
          overflow: 'auto',
          p: 1,
        }}
      >
        <EventList tags={tags} />
      </Box>
    </Box>
  );
}

'use client';
import { Box } from '@mui/material';
import Navbar from '@/components/navbar';
import { EventList } from '@/components/eventlist';

interface EventInfo {
  eventName: string;
  eventStart: Date;
  eventEnd: Date;
  eventDescription: string;
  eventType: string;
  eventRequirements?: (string | null)[];
  eventPreferences?: (string | null)[];
}

interface EventViewProps {
  events: EventInfo[];
}

export default function EventListView({ events }: EventViewProps) {
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
        <EventList events={events} />
      </Box>
    </Box>
  );
}

'use client';
import DashCalendar from '@/components/dashcalendar';
import { DashEventList } from '@/components/dasheventlist';
import { Box, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { EventClickArg } from '@fullcalendar/core';
import { DashVolunteerList } from '@/components/dashvolunteerlist';
import NavBar from '@/components/navbar';

interface ListEventInfo {
  eventName: string;
  eventStart: Date;
  eventEnd: Date;
  eventDescription: string;
  eventType: string;
  eventRequirements?: (string | null)[];
  eventPreferences?: (string | null)[];
  id: string;
}

interface CalEventInfo {
  title: string;
  start: Date;
  end: Date;
  description: string;
}

interface emergContact {
  ecName: string;
  ecPhone: string;
}

interface utag {
  tag: string;
  tagProf: string;
}

interface UserData {
  name: string;
  phone: string;
  email: string;
  pronouns: string;
  accomm?: string[];
  otherAccomm?: string;
  emergencyContacts?: emergContact;
  userTags?: (utag | null)[];
  events: string[];
}

interface EventInfoProps {
  listevents: ListEventInfo[];
  calevents: CalEventInfo[];
  recentEvent: ListEventInfo;
  users: UserData[];
}

export default function AdminDashView({
  listevents,
  calevents,
  recentEvent,
  users,
}: EventInfoProps) {
  const [selectedEvent, setSelectedEvent] = useState(recentEvent);

  const handleCalendarEventClick = (eventInfo: EventClickArg) => {
    const { description } = eventInfo.event.extendedProps;
    const matchingListEvent = listevents.find((evt) => {
      return evt.id === description;
    });

    setSelectedEvent(matchingListEvent ?? recentEvent);
  };

  const filtUsers = selectedEvent
    ? users.filter((user) => user.events.includes(selectedEvent.id))
    : [];

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#e2e7e2',
        overflow: 'hidden',
      }}
    >
      <NavBar userType={'Admin'} userId={''} page={'Dashboard'} />
      <Grid
        container
        padding="10px"
        spacing="25px"
        sx={{ height: '100%', width: '100%' }}
      >
        <Grid item xs={5} sx={{ height: '100%' }}>
          <DashCalendar
            events={calevents}
            onEventClick={handleCalendarEventClick}
          />
        </Grid>
        <Grid item xs={7} sx={{ width: '100%' }}>
          <Stack spacing="20px" sx={{ paddingLeft: '10px' }}>
            <DashEventList events={selectedEvent} />
            <DashVolunteerList users={filtUsers} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

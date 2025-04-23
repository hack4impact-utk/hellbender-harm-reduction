'use client';
import Navbar from '@/components/navbar';
import { Box, Grid, Typography, Stack } from '@mui/material';
import FullUserCalendar from '@/components/fullcalendar';
import hhrColors from '@/utils/hhr-theme';
import { alpha } from '@mui/material/styles';
import ListCalendar from '@/components/listcalendar';

// interfaces for events
interface EventData {
  title: string;
  start: Date;
  end: Date;
}

interface CalendarProps {
  events: EventData[];
}

export default function CalendarView({ events }: CalendarProps) {
  return (
    <Box
      sx={{
        backgroundColor: alpha(hhrColors.palette.hhr.contrastText, 1),
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Navbar userType={'Admin'} userId={''} page={'Calendar'} />
      <Grid
        container
        sx={{
          backgroundColor: alpha(hhrColors.palette.hhr.contrastText, 1),
          height: '100%',
        }}
      >
        <Grid item xs={8} padding={'15px'} sx={{ overflow: 'auto' }}>
          <FullUserCalendar events={events} />
        </Grid>
        <Grid item xs={4} padding={'15px'} sx={{ height: '100%' }}>
          <Stack
            alignContent="center"
            sx={{
              backgroundColor: '#42603C',
              mt: 2,
              borderRadius: '16px',
              overflow: 'hidden',
              padding: '15px',
              height: '85%',
            }}
          >
            <Typography
              variant="h4"
              color="white"
              padding={'5px'}
              marginBottom={'10px'}
              textAlign={'center'}
              fontFamily={'Verdana'}
              sx={{ fontWeight: 'bold' }}
            >
              Upcoming
            </Typography>
            <Box sx={{ overflowY: 'auto', backgroundColor: '#E2E7E2' }}>
              <ListCalendar events={events} />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

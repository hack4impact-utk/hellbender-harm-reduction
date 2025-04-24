'use client';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

// interfaces for events
interface ListEventData {
  title: string;
  start: Date;
  end: Date;
}

interface ListCalendarProps {
  events: ListEventData[];
}

// format event time
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// group events by start date for accordions
const groupEventsByDate = (events: ListEventData[]) => {
  return events.reduce<Record<string, ListEventData[]>>((acc, event) => {
    const dateKey = event.start.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});
};

// actual component function
export default function ListCalendar({ events }: ListCalendarProps) {
  // get today's date for start of list
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // get the date one year from today for end of list
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);

  // filter to only include upcoming events within the next year
  const upcomingEvents = events.filter((event) => {
    return event.start >= today && event.start <= nextYear;
  });

  // group and sort events
  const groupedEvents = groupEventsByDate(upcomingEvents);
  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // returns list component
  return (
    <>
      {sortedDates.length === 0 ? (
        <Typography>No upcoming events in the next year.</Typography>
      ) : (
        sortedDates.map((dateStr, index) => (
          <Accordion
            key={index}
            expanded
            sx={{
              '&.Mui-expanded': {
                margin: 0,
              },
              '&:before': {
                display: 'none',
              },
              boxShadow: 'none',
            }}
          >
            <AccordionSummary
              expandIcon={null}
              sx={{
                pointerEvents: 'none',
                cursor: 'default',
                backgroundColor: '#E2E7E2',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ flex: 1 }}>
                {new Date(dateStr).toLocaleDateString(undefined, {
                  weekday: 'long',
                })}
              </Typography>

              <Typography
                variant="h6"
                fontFamily={'Verdana'}
                sx={{ flex: 1, textAlign: 'right' }}
              >
                {new Date(dateStr).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: '#F0F5EF',
              }}
            >
              {groupedEvents[dateStr].map((event, i) => (
                <Box key={i} mb={1} display="flex" alignItems="center">
                  <IconButton sx={{ marginRight: 2, color: '#6E8569' }}>
                    <CircleIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontFamily={'Verdana'}>
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={'Verdana'}
                    >
                      {formatTime(event.start)} – {formatTime(event.end)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  );
}

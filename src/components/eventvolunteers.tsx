import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Stack,
  Box,
  Button,
  ListItem,
  ListItemText,
  Radio,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useRef, useEffect, useState } from 'react';
import { Clear } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// needed interfaces
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

interface EventData {
  id: string;
  eventName: string;
  start: Date;
  end: Date;
}

interface DataTableProps {
  users: UserData[];
  events: EventData[];
}

declare module '@mui/material/styles' {
  interface Components {
    MuiPickerPopper?: {
      styleOverrides?: {
        paper?: any;
      };
    };
    MuiPickersTextField?: {
      styleOverrides?: {
        root?: any;
      };
    };
    MuiMonthCalendar?: {
      styleOverrides?: {
        button?: any;
      };
    };
    MuiYearCalendar?: {
      styleOverrides?: {
        button?: any;
      };
    };
  }
}

// creates theme for styling of DatePicker (can't be done in component itself)
const custTheme = createTheme({
  components: {
    MuiPickerPopper: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f0f5ef',
        },
      },
    },
    MuiPickersTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#e2e7e2',
          borderRadius: '4px',
        },
      },
    },
    MuiMonthCalendar: {
      styleOverrides: {
        button: {
          '&.Mui-selected:focus': {
            backgroundColor: '#6e8569',
            color: 'white',
          },
          '&.Mui-selected': {
            backgroundColor: '#6e8569',
            color: 'white',
          },
        },
      },
    },
    MuiYearCalendar: {
      styleOverrides: {
        button: {
          '&.Mui-selected:focus': {
            backgroundColor: '#6e8569',
            color: 'white',
          },
          '&.Mui-selected': {
            backgroundColor: '#6e8569',
            color: 'white',
          },
        },
      },
    },
  },
});

// exports list of volunteers by event
export function EventVolunteers({ users, events }: DataTableProps) {
  // a bunch of needed values
  const chronEvents = [...events].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const filtUsers = selectedEventId
    ? users.filter((user) => user.events.includes(selectedEventId))
    : [];

  // gets a list of all events within selected month
  const filteredEvents = selectedDate
    ? chronEvents.filter((event) => {
        const eventDate = dayjs(event.start);
        return (
          eventDate.month() === selectedDate.month() &&
          eventDate.year() === selectedDate.year()
        );
      })
    : chronEvents;

  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!hasScrolledRef.current && chronEvents.length > 0) {
      const now = new Date();

      // Sort and find the first upcoming event
      const sortedEvents = [...chronEvents].sort(
        (a, b) => a.start.getTime() - b.start.getTime()
      );
      const upcomingEvent = sortedEvents.find((event) => event.end > now);

      if (upcomingEvent) {
        // Set the selected event ID
        setSelectedEventId(upcomingEvent.id);

        const scrollContainer = scrollContainerRef.current;
        const targetElement = itemRefs.current.find(
          (el, i) => chronEvents[i].id === upcomingEvent.id
        );

        if (targetElement && scrollContainer) {
          const headerOffset = 5;

          const targetPosition =
            targetElement.offsetTop - scrollContainer.offsetTop - headerOffset;

          scrollContainer.scrollTo({
            top: targetPosition > 0 ? targetPosition : 0,
            behavior: 'smooth',
          });
        }

        hasScrolledRef.current = true;
      }
    }
  }, [chronEvents]);

  //returns actual component
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <Grid
        container
        padding={'15px'}
        columnSpacing={'15px'}
        sx={{ height: '100%' }}
      >
        <Grid item xs={3} sx={{ height: '100%' }}>
          <Stack
            sx={{
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#42603C',
              }}
            >
              <Typography
                color={'white'}
                padding={'10px'}
                fontFamily={'Verdana'}
                fontSize={'25px'}
              >
                Choose Event
              </Typography>
              <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
                <Typography
                  color={'white'}
                  padding={'15px'}
                  fontFamily={'Verdana'}
                  fontSize={'20px'}
                >
                  Filter by Month:{' '}
                </Typography>
                <ThemeProvider theme={custTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={['year', 'month']}
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                      sx={{
                        width: '40%',
                      }}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
                <IconButton
                  onClick={() => setSelectedDate(null)}
                  aria-label="clear date filter"
                >
                  <Clear />
                </IconButton>
              </Stack>
            </Box>
            <Box
              ref={scrollContainerRef}
              sx={{
                backgroundColor: '#F0F5EF',
                height: '80%',
                overflowY: 'auto',
              }}
            >
              {filteredEvents.map((event, index) => (
                <ListItem
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  divider
                  sx={{
                    backgroundColor:
                      event.end < new Date() ? '#e2e7e2' : 'inherit',
                  }}
                  secondaryAction={
                    <FormControlLabel
                      value={event.id}
                      control={
                        <Radio
                          checked={selectedEventId === event.id}
                          onChange={() => setSelectedEventId(event.id)}
                          color="primary"
                          sx={{
                            color: '#42603c',
                            '&.Mui-checked': {
                              color: '#42603c',
                            },
                          }}
                        />
                      }
                      label=""
                    />
                  }
                >
                  <ListItemText
                    primary={`${event.eventName}${event.end < new Date() ? ' - Past Event' : ''}`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Start: {event.start.toLocaleString()}
                        </Typography>
                        <br />
                        End: {event.end.toLocaleString()}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </Box>
            <Box padding={'15px'}>
              <Button
                sx={{
                  backgroundColor: '#F0F5Ef',
                  fontFamily: 'Verdana',
                  color: 'black',
                }}
              >
                Export
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              backgroundColor: '#F0F5EF',
              height: '100%',
              borderRadius: '5px',
            }}
          >
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: 'Verdana',
                        backgroundColor: '#42603C',
                        color: 'white',
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: 'Verdana',
                        backgroundColor: '#42603C',
                        color: 'white',
                      }}
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: 'Verdana',
                        backgroundColor: '#42603C',
                        color: 'white',
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: 'Verdana',
                        backgroundColor: '#42603C',
                        color: 'white',
                      }}
                    >
                      Pronouns
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: 'Verdana',
                        backgroundColor: '#42603C',
                        color: 'white',
                      }}
                    >
                      Accommodations
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: 'Verdana',
                        backgroundColor: '#42603C',
                        color: 'white',
                      }}
                    >
                      Emergency Contact
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: 'Verdana',
                        backgroundColor: '#42603C',
                        color: 'white',
                      }}
                    >
                      Tags
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedEventId ? (
                    filtUsers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            fontFamily: 'Verdana',
                            backgroundColor: '#F0F5Ef',
                          }}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Verdana',
                            backgroundColor: '#F0F5Ef',
                          }}
                        >
                          {user.phone}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Verdana',
                            backgroundColor: '#F0F5Ef',
                          }}
                        >
                          {user.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Verdana',
                            backgroundColor: '#F0F5Ef',
                          }}
                        >
                          {user.pronouns}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Verdana',
                            backgroundColor: '#F0F5Ef',
                          }}
                        >
                          {user.accomm && user.accomm.length > 0 ? (
                            user.accomm.map((item, idx) => (
                              <Typography key={idx} variant="body2">
                                {item}
                              </Typography>
                            ))
                          ) : user.otherAccomm ? (
                            <Typography variant="body2">
                              {user.otherAccomm}
                            </Typography>
                          ) : (
                            <Typography variant="body2">N/A</Typography>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Verdana',
                            backgroundColor: '#F0F5Ef',
                          }}
                        >
                          {user.emergencyContacts ? (
                            <Typography variant="body2">
                              {user.emergencyContacts.ecName}
                              <br />
                              {user.emergencyContacts.ecPhone}
                            </Typography>
                          ) : (
                            <span>N/A</span>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Verdana',
                            backgroundColor: '#F0F5Ef',
                          }}
                        >
                          {Array.isArray(user.userTags) &&
                          user.userTags.filter(Boolean).length > 0 ? (
                            user.userTags
                              .filter(
                                (
                                  tag
                                ): tag is { tag: string; tagProf: string } =>
                                  tag !== null
                              )
                              .map((item, idx) => (
                                <Typography key={idx} variant="body2">
                                  {item.tag}
                                  {item.tagProf !== 'N/A' &&
                                    ` - ${item.tagProf}`}
                                </Typography>
                              ))
                          ) : (
                            <Typography variant="body2">N/A</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          Select an event to view volunteers.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

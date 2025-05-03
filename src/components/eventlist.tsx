'use client';
import React, { useMemo, useState, useEffect } from 'react';
import {
  AddBusiness,
  AttachMoney,
  Handshake,
  Healing,
  HomeWork,
  LocalActivity,
  Vaccines,
  Event,
  Edit,
  Delete,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { AddEditEvent } from './addeditevent';

interface EventInfo {
  eventName: string;
  eventStart: string;
  eventEnd: string;
  eventDescription: string;
  eventType: string;
  eventRequirements?: (string | null)[];
  eventPreferences?: (string | null)[];
}

interface Tags {
  _id: string;
  tagName: string;
}

interface EventInfoProps {
  tags: Tags[];
}

export function EventList({ tags }: EventInfoProps) {
  // various useStates for all the parts of the view
  const userId = '681439a152a6f8d14f5ec44b';
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [signUpStatus, setSignUpStatus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [userTags, setUserTags] = useState<string[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [selectedEvent, setSelectedEvent] = useState<EventInfo | undefined>();
  const [combinedEventList, setCombinedEventList] = useState<
    (EventInfo & { _id: string })[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // function for handling when add/event dialog is opened to add an event
  const openAdd = () => {
    setMode('add');
    setSelectedEvent(undefined);
    setDialogOpen(true);
  };

  // function for handling when add/event dialog is opened to edit an event
  const openEdit = (event: combinedEvents) => {
    setMode('edit');
    setSelectedEvent(event);
    setSelectedEventId(event._id);
    setDialogOpen(true);
  };

  // function for when add/edit dialog is submitted
  const handleSubmit = async (eventObj: EventInfo & { _id?: string }) => {
    setDialogOpen(false);
    setSelectedEvent(undefined);
    setSelectedEventId(undefined);

    // event without id
    const { ...cleanedEvent } = eventObj;

    // ensure dates are ISO strings
    const eventStart = new Date(cleanedEvent.eventStart).toISOString();
    const eventEnd = new Date(cleanedEvent.eventEnd).toISOString();

    // clean and validate tag IDs (filter out nulls/undefined)
    const eventRequirements = (cleanedEvent.eventRequirements || []).filter(
      (id): id is string => typeof id === 'string' && id.trim() !== ''
    );
    const eventPreferences = (cleanedEvent.eventPreferences || []).filter(
      (id): id is string => typeof id === 'string' && id.trim() !== ''
    );

    // redefine data based on cleaned/validated info
    const payload = {
      ...cleanedEvent,
      eventStart,
      eventEnd,
      eventRequirements,
      eventPreferences,
    };

    // for debugging
    console.log(payload);

    // tries to make a put or post request
    try {
      const response = await fetch(
        mode === 'edit' ? `/api/events/${selectedEventId}` : '/api/events',
        {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      // throws error
      if (!response.ok) {
        throw new Error(`API ${mode === 'edit' ? 'update' : 'create'} failed`);
      }

      const data = await response.json();
      console.log(`${mode === 'edit' ? 'Updated' : 'Created'} event:`, data);
    } catch (error) {
      // more error handling
      console.error('Error submitting event:', error);
    }
    // calls fetchEvents to load updated event info from backend
    fetchEvents();
  };

  // function that makes delete fetch call when you delete an event
  const handleEventDelete = async (eventId: string) => {
    console.log(eventId);
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      console.log('Event deleted');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
    fetchEvents();
  };

  const handleSignUp = async (eventId: string) => {
    const appDate = new Date().toISOString();
    const newEvent = { uevent: eventId, appDate };

    try {
      const userRes = await fetch(`/api/users/${userId}`);
      if (!userRes.ok) throw new Error('Failed to fetch user data');

      const userData = await userRes.json();
      const currentEvents = userData.events || [];

      let updatedEvents;

      if (signUpStatus[eventId]) {
        // If already signed up, un-sign up (remove event from array)
        if (!confirm('Are you sure you want to un-sign up?')) return;
        updatedEvents = currentEvents.filter((e: any) => e.uevent !== eventId);
        setSignUpStatus((prevState) => ({
          ...prevState,
          [eventId]: false, // Update status for this event
        }));
        console.log('Un-signed up from event');
      } else {
        // If not signed up, sign up (add event to array)
        updatedEvents = [...currentEvents, newEvent];
        setSignUpStatus((prevState) => ({
          ...prevState,
          [eventId]: true, // Update status for this event
        }));
        console.log('Signed up for event');
      }

      // Send the updated events list to the backend
      const updateRes = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: updatedEvents }),
      });

      if (!updateRes.ok) throw new Error('Failed to update user events');
      const updatedData = await updateRes.json();
      console.log('Updated user events:', updatedData);

      // Re-check the status after update (optional)
      checkUserSignUpStatus(eventId);
    } catch (error) {
      console.error('Error during sign-up/un-sign-up:', error);
    }
  };

  const checkUserSignUpStatus = async (eventId: string) => {
    try {
      const userRes = await fetch(`/api/users/${userId}`);
      if (!userRes.ok) throw new Error('Failed to fetch user data');

      const userData = await userRes.json();
      const userEvents = userData.events || [];

      // Check if the user is signed up for the event
      const alreadySignedUp = userEvents.some((e: any) => e.uevent === eventId);
      setSignUpStatus((prevState) => ({
        ...prevState,
        [eventId]: alreadySignedUp, // Update sign-up status for this event
      }));
    } catch (error) {
      console.error('Error checking user sign up status:', error);
    }
  };

  // combines basic event info with id
  type combinedEvents = EventInfo & { _id: string };

  // 1) Sort events by eventStart (earliest first)
  const sortedEvents = useMemo(() => {
    return [...combinedEventList].sort(
      (a, b) =>
        new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
    );
  }, [combinedEventList]);

  // 2) Sort events into upcoming and past events
  const now = useMemo(() => new Date(), []);
  const upcomingEvents = useMemo(
    () =>
      sortedEvents.filter(
        (e) => new Date(e.eventStart).getTime() > now.getTime()
      ),
    [sortedEvents, now]
  );
  const pastEvents = useMemo(
    () =>
      sortedEvents.filter(
        (e) => new Date(e.eventStart).getTime() <= now.getTime()
      ),
    [sortedEvents, now]
  );

  // handles whether you're seeing past or upcoming events
  const toggleEvents = (isUpcoming: boolean) => {
    setShowUpcoming(isUpcoming);
  };

  // function that loads event data from the backend
  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setCombinedEventList(data);
    setLoading(false);
  };

  const fetchUserTags = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      const tagIds = (data.userTags || []).map((tagObj: any) => tagObj.tag); // assuming shape: { tag: string, name: string }
      setUserTags(tagIds);
    } catch (err) {
      console.error('Failed to fetch user tags:', err);
    }
  };

  const userMeetsRequirements = (eventRequirements: string[] = []) => {
    if (eventRequirements.length === 0) return true; // no requirements
    return eventRequirements.some((reqId) => userTags.includes(reqId));
  };

  // makes sure to call for event info on page load
  useEffect(() => {
    fetchEvents();
    fetchUserTags();
    combinedEventList.forEach((event) => {
      checkUserSignUpStatus(event._id); // Call for each eventId
    });
  }, [combinedEventList]);

  // if you're waiting on event info to be called put up a loading circle
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Box>
        <AddEditEvent
          open={dialogOpen}
          onCancel={() => {
            setDialogOpen(false);
            setSelectedEvent(undefined);
            setSelectedEventId(undefined);
          }}
          onSubmit={handleSubmit}
          tags={tags}
          event={
            mode === 'edit' && selectedEvent
              ? {
                  ...selectedEvent,
                  eventRequirements: (
                    selectedEvent.eventRequirements || []
                  ).filter((r): r is string => r !== null),
                  eventPreferences: (
                    selectedEvent.eventPreferences || []
                  ).filter((p): p is string => p !== null),
                }
              : undefined
          }
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Box>
          <Button
            variant="contained"
            onClick={() => toggleEvents(true)}
            sx={{
              marginRight: 2,
              backgroundColor: showUpcoming ? '#42603c' : '#6e8569',
              '&:hover': {
                backgroundColor: showUpcoming ? '#385233' : '#5d7159',
              },
            }}
          >
            Upcoming Events
          </Button>
          <Button
            variant="contained"
            onClick={() => toggleEvents(false)}
            sx={{
              backgroundColor: showUpcoming ? '#6e8569' : '#42603c',
              '&:hover': {
                backgroundColor: showUpcoming ? '#5d7159' : '#385233',
              },
            }}
          >
            Past Events
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={openAdd}
          sx={{
            backgroundColor: '#42603c',
            '&:hover': {
              backgroundColor: '#385233',
            },
          }}
        >
          Add Event
        </Button>
      </Box>
      {showUpcoming ? (
        upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => {
            const isFutureEvent =
              new Date(event.eventStart).getTime() > now.getTime();

            return (
              <Accordion
                key={event.eventStart}
                defaultExpanded={index === 0}
                sx={{
                  backgroundColor: '#F0F5EF',
                  border: '2px solid #C7CBC6',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: '#42603c',
                    color: '#FFFFFF',
                    flexDirection: 'row-reverse',
                    '& .MuiAccordionSummary-content': {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginLeft: '8px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Left side: event's own icon + name */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ marginRight: 2 }}>
                        {
                          // Conditionally render the icon based on eventType
                          event.eventType === 'Harm Reduction Services' ? (
                            <Healing />
                          ) : event.eventType === 'Syringe Pick-Up' ? (
                            <Vaccines />
                          ) : event.eventType ===
                            'Community Education and Advocacy' ? (
                            <Handshake />
                          ) : event.eventType === 'In-Kind Fundraising' ? (
                            <AddBusiness />
                          ) : event.eventType === 'Building Work Days' ? (
                            <HomeWork />
                          ) : event.eventType === 'Fundraising' ? (
                            <AttachMoney />
                          ) : event.eventType === 'Special Events' ? (
                            <LocalActivity />
                          ) : (
                            <Event />
                          )
                        }
                      </Box>
                      <Typography>{event.eventName}</Typography>
                    </Box>

                    {/* Right side: date(s) */}
                    <Typography>
                      {new Date(event.eventStart).toLocaleDateString() ===
                      new Date(event.eventEnd).toLocaleDateString()
                        ? new Date(event.eventStart).toLocaleDateString()
                        : `${new Date(event.eventStart).toLocaleDateString()} - ${new Date(event.eventEnd).toLocaleDateString()}`}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ backgroundColor: '#F0F5EF' }}>
                  {/* Description */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: '1.1rem', marginBottom: 2 }}
                      >
                        {event.eventDescription}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        onClick={() => openEdit(event)}
                        sx={{
                          color: '#43533C',
                          border: '1px solid #43533C',
                          '&:hover': {
                            backgroundColor: '#e5ebe0',
                            borderColor: '#394733',
                          },
                          mr: 1,
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEventDelete(event._id)}
                        sx={{
                          color: '#d32f2f',
                          border: '1px solid #d32f2f',
                          '&:hover': {
                            backgroundColor: '#fddede',
                            borderColor: '#c62828',
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Times, Requirements, Preferences */}
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: 1, lineHeight: 1.6 }}
                  >
                    <strong>Event Start:</strong>{' '}
                    {new Date(event.eventStart).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ marginBottom: 1, lineHeight: 1.6 }}
                  >
                    <strong>Event End:</strong>{' '}
                    {new Date(event.eventEnd).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </Typography>

                  {event.eventRequirements?.length ? (
                    <Typography
                      variant="body2"
                      sx={{ marginBottom: 1, lineHeight: 1.6 }}
                    >
                      <strong>Requirements:</strong>{' '}
                      {event.eventRequirements
                        ?.map(
                          (id) =>
                            tags.find((tag) => tag._id === id)?.tagName ||
                            '(Unknown)'
                        )
                        .join(', ')}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ marginBottom: 1, lineHeight: 1.6 }}
                    >
                      <strong>No Requirements</strong>
                    </Typography>
                  )}

                  {event.eventPreferences?.length ? (
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      <strong>Preferences:</strong>{' '}
                      {event.eventPreferences
                        ?.map(
                          (id) =>
                            tags.find((tag) => tag._id === id)?.tagName ||
                            '(Unknown)'
                        )
                        .join(', ')}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      <strong>No Preferences</strong>
                    </Typography>
                  )}

                  {/* Conditionally render the "Sign Up" button for future events */}
                  {isFutureEvent && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#5F7755',
                          '&:hover': {
                            backgroundColor: showUpcoming
                              ? '#516548'
                              : '#394733',
                          },
                        }}
                        onClick={() => handleSignUp(event._id)}
                        disabled={
                          !userMeetsRequirements(
                            (event.eventRequirements ?? []).filter(
                              (id): id is string => id !== null
                            )
                          )
                        }
                      >
                        {signUpStatus[event._id] ? 'Un-sign Up' : 'Sign Up'}
                      </Button>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Typography>No Upcoming Events Available</Typography>
        )
      ) : pastEvents.length > 0 ? (
        pastEvents.map((event, index) => {
          return (
            <Accordion
              key={new Date(event.eventStart).toISOString()}
              defaultExpanded={index === 0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: '#42603c',
                  color: '#FFFFFF',
                  flexDirection: 'row-reverse',
                  '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: '8px',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Left side: event's own icon + name */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ marginRight: 2 }}>
                      {
                        // Conditionally render the icon based on eventType
                        event.eventType === 'Harm Reduction Services' ? (
                          <Healing />
                        ) : event.eventType === 'Syringe Pick-Up' ? (
                          <Vaccines />
                        ) : event.eventType ===
                          'Community Education and Advocacy' ? (
                          <Handshake />
                        ) : event.eventType === 'In-Kind Fundraising' ? (
                          <AddBusiness />
                        ) : event.eventType === 'Building Work Days' ? (
                          <HomeWork />
                        ) : event.eventType === 'Fundraising' ? (
                          <AttachMoney />
                        ) : event.eventType === 'Special Events' ? (
                          <LocalActivity />
                        ) : (
                          <Event />
                        )
                      }
                    </Box>
                    <Typography>{event.eventName}</Typography>
                  </Box>

                  {/* Right side: date(s) */}
                  <Typography>
                    {new Date(event.eventStart).toLocaleDateString() ===
                    new Date(event.eventEnd).toLocaleDateString()
                      ? new Date(event.eventStart).toLocaleDateString()
                      : `${new Date(event.eventStart).toLocaleDateString()} - ${new Date(event.eventEnd).toLocaleDateString()}`}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#F0F5EF' }}>
                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1.1rem', marginBottom: 2 }}
                >
                  {event.eventDescription}
                </Typography>

                {/* Times, Requirements, Preferences */}
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, lineHeight: 1.6 }}
                >
                  <strong>Event Start:</strong>{' '}
                  {new Date(event.eventStart).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1, lineHeight: 1.6 }}
                >
                  <strong>Event End:</strong>{' '}
                  {new Date(event.eventEnd).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </Typography>

                {event.eventRequirements?.length ? (
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: 1, lineHeight: 1.6 }}
                  >
                    <strong>Requirements:</strong>{' '}
                    {event.eventRequirements.join(', ')}
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: 1, lineHeight: 1.6 }}
                  >
                    <strong>No Requirements</strong>
                  </Typography>
                )}

                {event.eventPreferences?.length ? (
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    <strong>Preferences:</strong>{' '}
                    {event.eventPreferences.join(', ')}
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    <strong>No Preferences</strong>
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography>No Past Events Available</Typography>
      )}
    </Box>
  );
}

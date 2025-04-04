'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  AddBusiness,
  AttachMoney,
  Handshake,
  Healing,
  HomeWork,
  LocalActivity,
  Vaccines,
  Event,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Button,
} from '@mui/material';

interface EventInfo {
  eventName: string;
  eventStart: Date;
  eventEnd: Date;
  eventDescription: string;
  eventType: string;
  eventRequirements?: (string | null)[];
  eventPreferences?: (string | null)[];
}

interface EventInfoProps {
  events: EventInfo[];
}

export function EventList({ events }: EventInfoProps) {
  // 1) Sort events by eventStart (earliest first)
  const sortedEvents = useMemo(() => {
    return [...events].sort(
      (a, b) => a.eventStart.getTime() - b.eventStart.getTime()
    );
  }, [events]);

  // 2) Find index of the first future event
  const now = new Date();
  const closestFutureIndex = sortedEvents.findIndex(
    (e) => e.eventStart.getTime() > now.getTime()
  );

  // 3) Create refs for each event, so we can scroll the future one into view
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 4) After rendering, scroll to the future event (if any)
  useEffect(() => {
    if (closestFutureIndex >= 0 && itemRefs.current[closestFutureIndex]) {
      itemRefs.current[closestFutureIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [closestFutureIndex]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {sortedEvents.length > 0 ? (
        sortedEvents.map((event, index) => {
          // Check if this event is in the future
          const isFutureEvent = event.eventStart.getTime() > now.getTime();

          return (
            <Accordion
              key={index}
              defaultExpanded={index === closestFutureIndex}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
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
                    {event.eventStart.toLocaleDateString() ===
                    event.eventEnd.toLocaleDateString()
                      ? event.eventStart.toLocaleDateString()
                      : `${event.eventStart.toLocaleDateString()} - ${event.eventEnd.toLocaleDateString()}`}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
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
                  {event.eventStart.toLocaleTimeString('en-US', {
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
                  {event.eventEnd.toLocaleTimeString('en-US', {
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

                {/* Conditionally render the "Sign Up" button for future events */}
                {isFutureEvent && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: 2,
                    }}
                  >
                    <Button variant="contained">Sign Up</Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography>No Events Available</Typography>
      )}
    </Box>
  );
}

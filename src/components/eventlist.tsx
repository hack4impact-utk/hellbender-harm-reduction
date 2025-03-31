'use client';
import {
  AddBusiness,
  AttachMoney,
  Handshake,
  Healing,
  HomeWork,
  LocalActivity,
  Vaccines,
  Event,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
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

export function EventList(props: EventInfoProps) {
  return (
    <Box>
      {props.events.length > 0 ? (
        props.events.map((event, index) => (
          <Accordion key={index}>
            <AccordionSummary>
              <Box sx={{ marginRight: 2 }}>
                {
                  // Conditionally render the icon based on eventType
                  event.eventType === 'Harm Reduction Services' ? (
                    <Healing />
                  ) : event.eventType === 'Syringe Pick-Up' ? (
                    <Vaccines />
                  ) : event.eventType === 'Community Education and Advocacy' ? (
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
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{event.eventDescription}</Typography>
              <Typography>
                Event Start: {event.eventStart.toLocaleString()}
                <br />
                Event Description: {event.eventEnd.toLocaleString()}
              </Typography>
              {event.eventRequirements ? (
                <Typography>
                  Requirements: {event.eventRequirements.join(', ')}
                </Typography>
              ) : (
                <Typography>No Requirements</Typography>
              )}
              {event.eventPreferences ? (
                <Typography>
                  Preferences: {event.eventPreferences.join(', ')}
                </Typography>
              ) : (
                <Typography>No Preferences</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No Events Available</Typography>
      )}
    </Box>
  );
}

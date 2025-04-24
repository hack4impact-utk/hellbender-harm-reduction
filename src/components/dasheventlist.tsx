'use client';
import React from 'react';
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
  id: string;
}

interface EventInfoProps {
  events: EventInfo;
}

export function DashEventList({ events }: EventInfoProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Accordion
        expanded
        sx={{
          backgroundColor: '#F0F5EF',
          border: '2px solid #C7CBC6',
        }}
      >
        <AccordionSummary
          aria-controls="always-expanded-content"
          id="always-expanded-header"
          expandIcon={null}
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
                  events.eventType === 'Harm Reduction Services' ? (
                    <Healing />
                  ) : events.eventType === 'Syringe Pick-Up' ? (
                    <Vaccines />
                  ) : events.eventType ===
                    'Community Education and Advocacy' ? (
                    <Handshake />
                  ) : events.eventType === 'In-Kind Fundraising' ? (
                    <AddBusiness />
                  ) : events.eventType === 'Building Work Days' ? (
                    <HomeWork />
                  ) : events.eventType === 'Fundraising' ? (
                    <AttachMoney />
                  ) : events.eventType === 'Special Events' ? (
                    <LocalActivity />
                  ) : (
                    <Event />
                  )
                }
              </Box>
              <Typography>{events.eventName}</Typography>
            </Box>

            {/* Right side: date(s) */}
            <Typography>
              {events.eventStart.toLocaleDateString() ===
              events.eventEnd.toLocaleDateString()
                ? events.eventStart.toLocaleDateString()
                : `${events.eventStart.toLocaleDateString()} - ${events.eventEnd.toLocaleDateString()}`}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: '#F0F5EF' }}>
          {/* Description */}
          <Typography
            variant="body1"
            sx={{ fontSize: '1.1rem', marginBottom: 2 }}
          >
            {events.eventDescription}
          </Typography>

          {/* Times, Requirements, Preferences */}
          <Typography variant="body2" sx={{ marginBottom: 1, lineHeight: 1.6 }}>
            <strong>Event Start:</strong>{' '}
            {events.eventStart.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: 1, lineHeight: 1.6 }}>
            <strong>Event End:</strong>{' '}
            {events.eventEnd.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </Typography>

          {events.eventRequirements?.length ? (
            <Typography
              variant="body2"
              sx={{ marginBottom: 1, lineHeight: 1.6 }}
            >
              <strong>Requirements:</strong>{' '}
              {events.eventRequirements.join(', ')}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{ marginBottom: 1, lineHeight: 1.6 }}
            >
              <strong>No Requirements</strong>
            </Typography>
          )}

          {events.eventPreferences?.length ? (
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>Preferences:</strong> {events.eventPreferences.join(', ')}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>No Preferences</strong>
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

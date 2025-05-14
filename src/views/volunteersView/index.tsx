'use client';
import { Box, Tab, Tabs, Button, Grid, Stack } from '@mui/material';
import Navbar from '@/components/navbar';
import React, { useState } from 'react';
import { AllVolunteers } from '@/components/allvolunteers';
import { EventVolunteers } from '@/components/eventvolunteers';
import VolsRegistered from '@/components/volsregistered';
import ReferralInfo from '@/components/referralinfo';
import PrefEventMetrics from '@/components/prefeventmetrics';
import { EventTypeEnum } from '@/types/event';
import { EventDistribution } from '@/components/eventsdistribution';
import { DisplayFacts } from '@/components/displayfacts';

//interfaces for the data in all three components/tabs
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
interface emergContact {
  ecName: string;
  ecPhone: string;
}

interface AllUserData {
  name: string;
  phone: string;
  email: string;
  pronouns: string;
  emergencyContacts?: emergContact;
}

interface Referrals {
  source: string;
  count: number;
}

interface Events {
  type: string;
  count: number;
}

interface events {
  event_years_start: number;
  event_types: Map<number, Map<EventTypeEnum, number>>;
  event_total: Map<number, number>;
}

interface MetricData {
  volsregistered: number;
  distribution: events;
  referrals: Referrals[];
  prefevents: Events[];
}

interface DataTableProps {
  alldata: AllUserData[];
  userdata: UserData[];
  eventdata: EventData[];
  metrics: MetricData;
  facts: string[];
}

export default function VolunteersView({
  alldata,
  userdata,
  eventdata,
  metrics,
  facts,
}: DataTableProps) {
  // keeps track of which tab is selected
  const [selected, setSelected] = useState<number>(0);

  // for handling when someone swaps tabs
  const handleTabChange = (
    event: React.SyntheticEvent,
    newSelected: number
  ) => {
    setSelected(newSelected);
  };

  // returns actual page
  return (
    <Box
      sx={{
        backgroundColor: '#E2E7E2',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Navbar userType={'Admin'} userId={''} page={'Volunteers'} />
      <Box
        sx={{
          height: '90%',
          width: '99%',
          padding: '10px',
        }}
      >
        <Tabs
          value={selected}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#42603C',
            },
          }}
        >
          <Tab
            label="Metrics"
            sx={{
              color: '#6E8569',
              '&.Mui-selected': {
                color: '#42603C',
                fontWeight: 'bold',
              },
            }}
          />
          <Tab
            label="All Volunteers"
            sx={{
              color: '#6E8569',
              '&.Mui-selected': {
                color: '#42603C',
                fontWeight: 'bold',
              },
            }}
          />
          <Tab
            label="Volunteers By Event"
            sx={{
              color: '#6E8569',
              '&.Mui-selected': {
                color: '#42603C',
                fontWeight: 'bold',
              },
            }}
          />
        </Tabs>
        <Box
          sx={{
            height: '90%',
            width: '100%',
            borderRadius: '0 0 15px 15px',
            backgroundColor: '#6E8569',
          }}
        >
          {selected === 0 && (
            <Grid container sx={{ height: '100%', width: '100%' }}>
              <Grid item xs={4} sx={{ height: '100%', width: '100%' }}>
                <Stack
                  spacing="20px"
                  sx={{
                    height: '100%',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                  }}
                >
                  <VolsRegistered amount={metrics.volsregistered} />
                  <Box
                    sx={{
                      backgroundColor: '#f0f5ef',
                      border: '2px solid',
                      borderColor: '#42603c',
                      borderRadius: '15px',
                      height: '45%',
                    }}
                  >
                    <DisplayFacts facts={facts} />
                  </Box>
                </Stack>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  height: '100%',
                  width: '100%',
                  padding: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}
              >
                <EventDistribution
                  event_years_start={metrics.distribution.event_years_start}
                  event_types={metrics.distribution.event_types}
                  event_total={metrics.distribution.event_total}
                />
              </Grid>
              <Grid item xs={4} sx={{ height: '100%', width: '100%' }}>
                <Stack
                  spacing="20px"
                  sx={{
                    height: '100%',
                    width: '95%',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                  }}
                >
                  <ReferralInfo referrals={metrics.referrals} />
                  <PrefEventMetrics events={metrics.prefevents} />
                </Stack>
              </Grid>
            </Grid>
          )}
          {selected === 1 && (
            <Box padding={'15px'} sx={{ height: '100%' }}>
              <Box sx={{ height: '85%', overflowY: 'auto' }}>
                <AllVolunteers data={alldata} />
              </Box>
              <Box padding={'20px'}>
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
            </Box>
          )}
          {selected === 2 && (
            <Box sx={{ height: '100%' }}>
              <EventVolunteers users={userdata} events={eventdata} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

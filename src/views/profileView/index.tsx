'use client';
import { Typography, Box, Tab, Tabs, Grid, Stack } from '@mui/material';
import Navbar from '@/components/navbar';
import React, { useState } from 'react';
import { UserInfo } from '@/components/userinfo';
import { YearlyEvents } from '@/components/yearlyevents';

interface EmergencyContact {
  ecName: string;
  ecPhone: string;
}

interface userTags {
  tag: string;
  tagProf: string;
}

interface custReminders {
  daysPrior: number;
  time: string;
}

interface User {
  name: string;
  email: string;
  image: string;
  userType: string;
  emergencyContact?: EmergencyContact | [];
  pronouns: string;
  userTags?: (userTags | null)[];
  phone: string;
  eventPreferences: string[];
  reminders?: string[];
  custReminders?: custReminders[];
  newEvents: string;
  referrals: string[];
  accomm?: string[];
  otherAccom?: string;
}

interface ProfileProps {
  user: User;
  count: number;
}

export default function ProfileView({ user, count }: ProfileProps) {
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
      }}
    >
      <Navbar userType={'Admin'} userId={''} page={'Volunteers'} />
      <Grid
        container
        spacing="10px"
        sx={{ width: '100%', height: '90%', paddingTop: '5px' }}
      >
        <Grid
          item
          xs={3}
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            spacing={5}
            alignItems="center"
            sx={{ width: '100%', height: '100%', paddingTop: '20%' }}
          >
            <Box
              sx={{
                backgroundColor: '#6e8569',
                borderRadius: '10px',
                width: '80%',
                height: '60%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UserInfo
                profilePicture={user.image}
                name={user.name}
                pronouns={user.pronouns}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: '#6e8569',
                borderRadius: '10px',
                width: '80%',
                height: '20%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <YearlyEvents number_events={count} />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Tabs
            value={selected}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 120,
                marginRight: 0.25,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottom: 'none',
                bgcolor: '#42603c',
                color: '#f0f5ef',
                '&.Mui-selected': {
                  bgcolor: '#6e8569',
                  color: '#f0f5ef',
                  fontWeight: 'bold',
                },
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
              borderRadius: '0 0 8px 8px',
              backgroundColor: '#6E8569',
            }}
          >
            {selected === 0 && <Typography>Volunteer Metrics</Typography>}
            {selected === 1 && <Typography>Hello</Typography>}
            {selected === 2 && <Typography>Hello</Typography>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

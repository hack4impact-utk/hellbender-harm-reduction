'use client';
import { Box, Tab, Tabs, Grid, Stack } from '@mui/material';
import Navbar from '@/components/navbar';
import React, { useState } from 'react';
import { UserInfo } from '@/components/userinfo';
import { YearlyEvents } from '@/components/yearlyevents';
import { EmergencyInfo } from '@/components/emergency';
import { NotificationInfo } from '@/components/notifications';
import { AccountInfo } from '@/components/accountinfo';

interface EmergencyContact {
  ecName: string;
  ecPhone: string;
}

interface userTags {
  tagId: string;
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
  emergencyContact?: EmergencyContact;
  pronouns: string;
  userTags?: userTags[];
  phone: string;
  eventPreferences: string[];
  reminders?: string[];
  custReminders?: custReminders[];
  newEvents: string;
  referrals: string[];
  accomm?: string[];
  otherAccomm?: string;
}

interface Tag {
  _id: string;
  tagName: string;
  certification: boolean;
}

interface ProfileProps {
  user: User;
  count: number;
  tags: Tag[];
}

export default function ProfileView({ user, count, tags }: ProfileProps) {
  const id = '681439a152a6f8d14f5ec44b';

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
        sx={{ width: '100%', height: '90%', padding: '15px' }}
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
            sx={{ width: '100%', height: '100%', paddingTop: '10%' }}
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
                id={id}
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
          <Box sx={{ paddingTop: '25px', height: '100%' }}>
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
                label="Account Info"
                sx={{
                  color: '#6E8569',
                  '&.Mui-selected': {
                    color: '#42603C',
                    fontWeight: 'bold',
                  },
                }}
              />
              <Tab
                label="Emergency Info"
                sx={{
                  color: '#6E8569',
                  '&.Mui-selected': {
                    color: '#42603C',
                    fontWeight: 'bold',
                  },
                }}
              />
              <Tab
                label="Notification Info"
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
                borderRadius: '0 10px 10px 10px',
                backgroundColor: '#6E8569',
              }}
            >
              {selected === 0 && (
                <Box sx={{ height: '100%' }}>
                  <AccountInfo
                    id={id}
                    email={user.email}
                    phone={user.phone}
                    utags={user.userTags}
                    tags={tags}
                  />
                </Box>
              )}
              {selected === 1 && (
                <EmergencyInfo
                  id={id}
                  ecName={user.emergencyContact?.ecName}
                  ecPhone={user.emergencyContact?.ecPhone}
                  accomm={user.accomm}
                  otherAccomm={user.otherAccomm}
                />
              )}
              {selected === 2 && (
                <Box sx={{ height: '100%' }}>
                  <NotificationInfo
                    id={id}
                    eventPreferences={user.eventPreferences}
                    newEvents={user.newEvents}
                    reminders={user.reminders}
                    custReminders={user.custReminders}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

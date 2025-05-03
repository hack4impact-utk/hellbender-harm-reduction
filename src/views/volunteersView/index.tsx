'use client';
import { Typography, Box, Tab, Tabs, Button } from '@mui/material';
import Navbar from '@/components/navbar';
import React, { useState } from 'react';
import { AllVolunteers } from '@/components/allvolunteers';
import { EventVolunteers } from '@/components/eventvolunteers';
import { AsyncParser } from '@json2csv/node';
import { saveAs } from 'file-saver';

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

interface DataTableProps {
  alldata: AllUserData[];
  userdata: UserData[];
  eventdata: EventData[];
}

async function allDataToCSV(data: AllUserData[]) {
  const opts = {};
  const transformOpts = {};
  const asyncOpts = {};
  const parser = new AsyncParser(opts, asyncOpts, transformOpts); // json2csv setup

  const csv = await parser.parse(data).promise();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  saveAs(blob, 'volunteers.csv');
}

export default function VolunteersView({
  alldata,
  userdata,
  eventdata,
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
      }}
    >
      <Navbar userType={'Admin'} userId={''} page={'Volunteers'} />
      <Box
        sx={{
          height: '90%',
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
            borderRadius: '0 0 8px 8px',
            backgroundColor: '#6E8569',
          }}
        >
          {selected === 0 && <Typography>Volunteer Metrics</Typography>}
          {selected === 1 && (
            <Box padding={'15px'}>
              <AllVolunteers data={alldata} />
              <Box padding={'10px'}>
                <Button
                  sx={{
                    backgroundColor: '#F0F5Ef',
                    fontFamily: 'Verdana',
                    color: 'black',
                  }}
                  onClick={() => allDataToCSV(alldata)}
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

'use client';
import { Typography, Box, Tab, Tabs, Button } from '@mui/material';
import Topbar from '@/components/navbar';
import React, { useState } from 'react';
import { AllVolunteers } from '@/components/allvolunteers';

interface emergContact {
  ecName: string;
  ecPhone: string;
}

interface UserData {
  name: string;
  phone: string;
  email: string;
  pronouns: string;
  emergencyContacts?: emergContact;
}

interface DataTableProps {
  data: UserData[];
}

export default function VolunteersView({ data }: DataTableProps) {
  const [selected, setSelected] = useState<number>(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newSelected: number
  ) => {
    setSelected(newSelected);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#E2E7E2',
        height: '100vh',
      }}
    >
      <Topbar />
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
            label="Volunteers By Events"
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
              <AllVolunteers data={data} />
              <Box padding={'10px'}>
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
          {selected === 2 && <Typography>Volunteers By Events</Typography>}
        </Box>
      </Box>
    </Box>
  );
}

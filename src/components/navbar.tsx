'use client';
import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
} from '@mui/material';
import hhrColors from '@/utils/hhr-theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Topbar() {
  return (
    <>
      <AppBar
        sx={{
          width: '100%',
          height: '10vh',
          backgroundColor: hhrColors.palette.hhr.main,
          position: 'static',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center', // vertically center the icon
          alignItems: 'flex-end', // right justify the icon
          p: 2, // add some space between icon and bar
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Left Side - Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton edge="start" color="inherit" aria-label="logo">
                <img
                  src="https://media.discordapp.net/attachments/1019419893831053362/1346926832741650656/image.png?ex=67c9f6dd&is=67c8a55d&hm=4383ec3a08c7ce17b0d80b09ecd3f14fa608e6fd60e954bb0ba092c8818d69c8&=&format=webp&quality=lossless&width=1228&height=1228"
                  alt="Hellbender Logo"
                  style={{ height: '40px', width: '40px' }}
                />
              </IconButton>
            </Box>

            {/* Center - Navigation Links */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                color="inherit"
                component={Link}
                href="/calendar"
                sx={{ fontWeight: 'bold' }}
              >
                CALENDAR
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/events"
                sx={{ fontWeight: 'bold' }}
              >
                EVENTS
              </Button>
            </Box>

            {/* Right Side - Profile Icon */}
            <IconButton edge="end" color="inherit" aria-label="profile">
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

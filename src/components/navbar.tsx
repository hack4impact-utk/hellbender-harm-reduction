'use client';
import React from 'react';
import { AppBar, Button, Grid, IconButton, Link, Toolbar } from '@mui/material';
import hhrColors from '@/utils/hhr-theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import logo from '/public/hellbender_logo_2color_1668738125.png';
import { alpha } from '@mui/material/styles';
interface NavBarProps {
  userType: string;
  userId: string;
  page: string;
}

export default function NavBar({ userType, userId, page }: NavBarProps) {
  return (
    <AppBar
      sx={{
        width: '100%',
        height: '75px',
        backgroundColor: alpha(hhrColors.palette.hhr.main, 0.75),
        position: 'static',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Grid
            item
            xs={6}
            sm={4}
            md={6}
            container
            alignItems="center"
            columnGap={2}
          >
            <IconButton
              component={Link}
              href="https://www.hellbenderharmreduction.org/"
              color="inherit"
              aria-label="logo"
              sx={{
                padding: 0,
                height: '60px',
                aspectRatio: '1:1',
              }}
            >
              <Image
                alt="logo"
                src={logo}
                style={{ width: '100%', height: '100%' }}
              />
            </IconButton>
            <Button
              color="inherit"
              component={Link}
              href={`/dashboard/${userId}`}
              sx={{
                fontWeight: 'bold',
                fontSize: 30,
                paddingRight: 4,
                paddingLeft: 4,
                justifyContent: 'center',
                backgroundColor:
                  page === 'Dashboard' ? alpha('#000000', 0.1) : 'transparent',
                '&:hover': { backgroundColor: alpha('#ffffff', 0.25) },
              }}
            >
              DASHBOARD
            </Button>
            {/* Volunteer button (conditional) */}
            {(userType === 'Admin' || userType === 'Owner') && (
              <Button
                color="inherit"
                component={Link}
                href={`/volunteers/${userId}`}
                sx={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  paddingRight: 4,
                  paddingLeft: 4,
                  justifyContent: 'center',
                  backgroundColor:
                    page === 'Volunteers'
                      ? alpha('#000000', 0.1)
                      : 'transparent',
                  '&:hover': { backgroundColor: alpha('#ffffff', 0.25) },
                }}
              >
                VOLUNTEERS
              </Button>
            )}
          </Grid>
          {/* Calendar, events, and profile */}
          <Grid
            item
            xs={6}
            sm={4}
            md={6}
            container
            alignItems="center"
            justifyContent={'flex-end'}
            columnGap={2}
          >
            <Button
              color="inherit"
              component={Link}
              href={`/calendar`}
              sx={{
                fontWeight: 'bold',
                fontSize: 30,
                paddingRight: 4,
                paddingLeft: 4,
                justifyContent: 'center',
                backgroundColor:
                  page === 'Calendar' ? alpha('#000000', 0.1) : 'transparent',
                '&:hover': { backgroundColor: alpha('#ffffff', 0.25) },
              }}
            >
              CALENDAR
            </Button>
            <Button
              color="inherit"
              component={Link}
              href={`/events`}
              sx={{
                fontWeight: 'bold',
                fontSize: 30,
                paddingRight: 4,
                paddingLeft: 4,
                justifyContent: 'center',
                backgroundColor:
                  page === 'Events' ? alpha('#000000', 0.1) : 'transparent',
                '&:hover': { backgroundColor: alpha('#ffffff', 0.25) },
              }}
            >
              EVENTS
            </Button>

            <IconButton
              component={Link}
              href={`/profile/${userId}`}
              edge="end"
              color="inherit"
              aria-label="profile"
              sx={{
                backgroundColor:
                  page === 'Profile' ? alpha('#000000', 0.1) : 'transparent',
                '&:hover': { backgroundColor: alpha('#ffffff', 0.25) },
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

'use client';
import React from 'react';
import { AppBar, Button, Grid, IconButton, Link, Toolbar } from '@mui/material';
import hhrColors from '@/utils/hhr-theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import logo from '/public/hellbender_logo_2color_1668738125.png';

export default function Topbar() {
  return (
    <AppBar
      sx={{
        width: '100%',
        height: '9vh',
        backgroundColor: hhrColors.palette.hhr.main,
        position: 'static',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        p: 2, // padding for spacing
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={4} container alignItems="flex-start">
            <IconButton
              color="inherit"
              aria-label="logo"
              sx={{ padding: 0, height: '7vh', aspectRatio: '1:1' }}
            >
              <Image
                alt="logo"
                src={logo}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              ></Image>
            </IconButton>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-end">
            <Button
              color="inherit"
              component={Link}
              href="/calendar"
              sx={{
                fontWeight: 'bold',
                fontSize: 40,
                paddingRight: 8,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              CALENDAR
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/events"
              sx={{
                fontWeight: 'bold',
                fontSize: 40,
                paddingRight: 8,
                justifyContent: 'center',
              }}
            >
              EVENTS
            </Button>
            <IconButton edge="end" color="inherit" aria-label="profile">
              <AccountCircleIcon sx={{ fontSize: 80 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

'use client';
import React from 'react';
import { AppBar, Button, Grid, IconButton, Link, Toolbar } from '@mui/material';
import hhrColors from '@/utils/hhr-theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import logo from '/public/hellbender_logo_2color_1668738125.png';
import { alpha } from '@mui/material/styles';

export default function NavBar() {
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
        p: 2, // padding for spacing
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} sm={2} md={2} container alignItems="flex-start">
            <IconButton
              color="inherit"
              aria-label="logo"
              sx={{ padding: 0, height: '60px', aspectRatio: '1:1' }}
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
          <Grid item xs={0} sm={0} md={2}></Grid>
          <Grid
            item
            xs={0}
            sm={9}
            md={7.5}
            justifyContent="flex-end"
            alignItems="center"
            display="flex"
          >
            <Button
              color="inherit"
              component={Link}
              href="/calendar"
              alignSelf={'center'}
              sx={{
                fontWeight: 'bold',
                fontSize: 30,
                paddingRight: 4,
                paddingLeft: 4,
                justifyContent: 'center',
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
                fontSize: 30,
                justifyContent: 'center',
                paddingRight: 4,
                paddingLeft: 4,
              }}
            >
              EVENTS
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sm={1}
            md={0.5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton edge="end" color="inherit" aria-label="profile">
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

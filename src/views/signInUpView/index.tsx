'use client';

import { Box, Grid } from '@mui/material';
import React from 'react';

export default function SignInUpView({ _form }: { _form: React.JSX.Element }) {
  // const [currentPage, setCurrentPage] = useState("Login")

  return (
    <Grid
      container
      sx={{ backgroundColor: '#F0F5EF', height: '100%', width: '100%' }}
    >
      {/* Left Section - Logo Box */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F0F5EF',
          height: '98vh',
          padding: '2vw',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#E2E7E2',
            padding: '2vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #C7CBC6',
            boxShadow: 2,
            width: '70%', // Responsive width
            // height: 'auto',
            // minHeight: '20%', // Ensures it grows and shrinks
            aspectRatio: '1 / 1',
            flex: 1, // Allows resizing
            maxWidth: '900px',
          }}
        >
          <Box
            component="img"
            src="https://97909ed298871c1c3997.cdn6.editmysite.com/uploads/b/97909ed298871c1c39978c553f037980c85699e32ed81d9c42acae59553913d6/hellbender_logo_1color_1668738125.png?width=2400&optimize=medium"
            alt="Hellbender Harm Reduction Logo"
            sx={{
              maxWidth: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Grid>

      {/* Right Section - Background */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '98vh', // Make it slightly smaller than full height
          width: '100%',
          backgroundColor: 'rgba(66, 96, 60, 0.75)',
          padding: '2vw',
          borderRadius: '30px', // Ensure rounded corners are visible
          boxShadow: 4,
          margin: 'auto', // Center it horizontally
        }}
      >
        {/* Inner Box - Rounded Login Section */}
        <Box
          sx={{
            backgroundColor: '#5F7755',
            padding: '2vw',
            borderRadius: '20px',
            width: '100%', // Responsive width
            maxWidth: '75%',
            height: '65%',
            minHeight: '70vh',
            flex: 1,
            color: '#fff',
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* {currentPage === "Login" && <SignInForm email={''} password={''}></SignInForm>} */}
          {_form}
        </Box>
      </Grid>
    </Grid>
  );
}

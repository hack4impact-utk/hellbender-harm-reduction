'use client';

import SignInForm from '@/components/signin';
import { Box, Grid, Link, Typography } from '@mui/material';

// interface SignInUpViewProps {

// }

export default function SignInUpView(/*props: SignInUpViewProps*/) {
  return (
    <Grid
      container
      sx={{ backgroundColor: '#F0F5EF', height: '100%', width: '100%' }}
    >
      {/* Left Section - Logo Box */}
      <Grid
        item
        xs={12}
        md={5.45}
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
            width: '80%', // Responsive width
            maxWidth: '500px',
            height: '40%',
            minHeight: '500px', // Ensures it grows and shrinks
            flex: 1, // Allows resizing
          }}
        >
          <Box
            component="img"
            src="https://97909ed298871c1c3997.cdn6.editmysite.com/uploads/b/97909ed298871c1c39978c553f037980c85699e32ed81d9c42acae59553913d6/hellbender_logo_1color_1668738125.png?width=2400&optimize=medium"
            alt="Hellbender Harm Reduction Logo"
            sx={{
              maxWidth: '100%',
              height: '80%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Grid>

      {/* Right Section - Background */}
      <Grid
        item
        xs={12}
        md={6.5}
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
            height: '60%',
            minHeight: '50vh',
            flex: 1,
            color: '#fff',
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <SignInForm email={''} password={''}></SignInForm>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%', // Use full width of parent
              height: 'auto', // Let it take natural height
            }}
          >
            <Box
              component="img"
              src="https://i.imgur.com/meVm0JE.png"
              alt="Footer Image"
              sx={{
                maxWidth: '60%',
                maxHeight: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', marginTop: 2, fontSize: 20 }}
          >
            New to Hellbender&apos;s?{' '}
            <Link href="#" underline="hover" sx={{ color: '#F0F5EF' }}>
              Sign-up here.
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

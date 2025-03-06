'use client';
import {
  Box,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';

interface resetPassProps {
  email: string;
}

export default function ResetPassForm(props: resetPassProps) {
  const [email, setEmail] = useState(props.email);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignSelf={'center'}
        alignItems="center"
        height="80%"
        width="80%"
        sx={{ marginTop: 5 }}
      >
        <Box alignSelf={'center'} justifySelf={'start'}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Reset your password
          </Typography>
        </Box>
        {/* Main Content */}
        <Grid
          container
          direction="column"
          spacing={3}
          justifyContent="center"
          sx={{ flexGrow: 1, width: '100%' }} // Ensures content is centered and responsive
        >
          <Grid item justifyContent="center" sx={{ marginTop: 2 }}>
            <Typography
              variant="h4"
              justifyContent="center"
              justifySelf={'center'}
              sx={{ textAlign: 'center', width: '90%', alignContent: 'center' }}
            >
              Please enter the email associated with your account
            </Typography>
            <Typography
              variant="subtitle1"
              justifyContent="center"
              justifySelf={'center'}
              sx={{
                textAlign: 'center',
                width: '80%',
                alignContent: 'center',
                marginTop: 2,
              }}
            >
              We&apos;ll send instructions to reset your password if there is an
              account associated with this email.
            </Typography>
          </Grid>
          <Grid item sx={{ marginTop: 4 }}>
            <TextField
              required
              label="Email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: '#fff' }}
            ></TextField>
          </Grid>
          <Grid
            item
            display={'flex'}
            justifyContent={'right'}
            sx={{ marginTop: 2 }}
          >
            <IconButton aria-label="Next" size="large">
              <ArrowCircleRightOutlinedIcon
                sx={{ fontSize: 65, color: 'white' }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Box
          alignSelf={'end'}
          sx={{
            width: '100%', // Use full width of parent
            // height: 'auto', // Let it take natural height
          }}
        >
          <Box
            component="img"
            src="https://i.imgur.com/meVm0JE.png"
            alt="Footer Image"
            sx={{
              maxWidth: '100%',
              maxHeight: 'auto',
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', marginTop: 4, fontSize: 20 }}
          >
            New to Hellbender&apos;s?{' '}
            <Link href="/signUp" underline="hover" sx={{ color: '#F0F5EF' }}>
              Sign-up here.
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

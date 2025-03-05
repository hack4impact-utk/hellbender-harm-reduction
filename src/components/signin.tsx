'use client';
import {
  Box,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import hhrColors from '@/utils/hhr-theme';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import router from 'next/router';

interface signInProps {
  email: string;
  password: string;
}

export default function SignInForm(props: signInProps) {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSignIn = async () => {
    // This code should attempt to fetch the user based on the email entered and go to the users profile page (not working yet)
    try {
      // Call the API to get the user by email
      const response = await fetch(`/api/users?email=${email}`);
      if (!response.ok) {
        throw new Error('User not found or error fetching user.');
      }
      const user = await response.json();
      if (!user || !user.id) {
        throw new Error('Invalid user data received.');
      }
      // Redirect to profile/[id] page
      router.push(`/profile/${user.id}`);
    } catch (error) {
      console.error('Sign-in error:', error);
      // setError('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <>
      <ThemeProvider theme={hhrColors}>
        <Box
          alignSelf={'center'}
          sx={{
            width: '80%', // Use full width of parent
          }}
        >
          <Grid container direction="column" spacing={6}>
            <Grid item>
              <Typography
                variant="h2"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                WELCOME!
              </Typography>
              <Typography
                variant="h4"
                sx={{ textAlign: 'center', marginBottom: 3 }}
              >
                Login or Sign-up below
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                required
                label="Email"
                variant="filled"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  marginBottom: 1,
                }}
              ></TextField>
            </Grid>
            <Grid item>
              <FormControl
                required
                variant="filled"
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  marginBottom: 1,
                }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  id="outlined-adornment-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    backgroundColor: '#fff',
                  }}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Grid item>
              <Link
                href="/forgetPass"
                underline="hover"
                sx={{ color: '#F0F5EF', fontFamily: 'Arial, sans-serif' }}
              >
                Forgot Password?
              </Link>
            </Grid>
            <Grid item sx={{ marginTop: 2 }}>
              <IconButton aria-label="Next" size="large" onClick={handleSignIn}>
                <ArrowCircleRightOutlinedIcon
                  sx={{ fontSize: 65, color: 'white' }}
                />
              </IconButton>
            </Grid>
            <Grid item>
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
                    maxWidth: '100%',
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
                <Link
                  href="/signUp"
                  underline="hover"
                  sx={{ color: '#F0F5EF' }}
                >
                  Sign-up here.
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

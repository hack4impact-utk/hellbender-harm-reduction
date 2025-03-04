'use client';
import {
  Grid,
  IconButton,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import hhrColors from '@/utils/hhr-theme';

interface signInProps {
  email: string;
  password: string;
}

export default function SignInForm(props: signInProps) {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  return (
    <>
      <ThemeProvider theme={hhrColors}>
        <Grid container direction="column" spacing={3}>
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
              sx={{ backgroundColor: '#fff', borderRadius: 1, marginBottom: 2 }}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              required
              label="Password"
              variant="filled"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, marginBottom: 1 }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Grid item>
            <Link
              href="#"
              underline="hover"
              sx={{ color: '#F0F5EF', fontFamily: 'Arial, sans-serif' }}
            >
              Forgot Password?
            </Link>
          </Grid>
          <Grid item sx={{ marginTop: 2 }}>
            <IconButton aria-label="Next" size="large">
              <ArrowCircleRightOutlinedIcon
                sx={{ fontSize: 65, color: 'white' }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

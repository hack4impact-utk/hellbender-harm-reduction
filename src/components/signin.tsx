'use client';
import { Box, Grid, IconButton, TextField } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';

interface signInProps {
  email: string;
  password: string;
}

export default function SignInForm(props: signInProps) {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            required
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Box sx={{ p: 1 }}></Box>
      <Grid container sx={{ justifyContent: 'flex-end' }}>
        <Grid item>
          <IconButton aria-label="Next" size="large">
            <ArrowCircleRightOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

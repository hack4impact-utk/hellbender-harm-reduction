'use client';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';

interface resetPassProps {
  email: string;
}

export default function ResetPassForm(props: resetPassProps) {
  const [email, setEmail] = useState(props.email);

  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h6">
            Please enter the email associated with your account
          </Typography>
          <Typography variant="subtitle2">
            We&apos;ll send instructions to reset your password if there is an
            account associated with this email.
          </Typography>
        </Grid>
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
      </Grid>
      <Grid
        container
        direction="column"
        sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
      >
        <Grid item>
          <Box sx={{ p: 1 }}></Box>
        </Grid>
        <Grid item>
          <IconButton aria-label="Next" size="large">
            <ArrowCircleRightOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

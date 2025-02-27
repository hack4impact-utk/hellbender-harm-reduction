'use client';
import {
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';

interface signUpProps {
  name: string;
  pronouns: string;
  email: string;
}

export default function SignUpForm(props: signUpProps) {
  const [name, setName] = useState(props.name);
  const [pronouns, setPronouns] = useState(props.pronouns);
  const [email, setEmail] = useState(props.email);

  const handleChange = (event: SelectChangeEvent) => {
    setPronouns(event.target.value as string);
  };

  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            required
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <Select value={pronouns} label="Pronouns" onChange={handleChange}>
            <MenuItem>She/Her</MenuItem>
            <MenuItem>He/Him</MenuItem>
            <MenuItem>They/Them</MenuItem>
            <MenuItem>Other</MenuItem>
            <MenuItem>Prefer Not to Answer</MenuItem>
          </Select>
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
        <IconButton aria-label="Next" size="large">
          <ArrowCircleRightOutlinedIcon />
        </IconButton>
      </Grid>
    </>
  );
}

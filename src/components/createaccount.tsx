'use client';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
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
      <Grid item xs={12} sm={10}>
        <TextField
          required
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel id="pronouns-select-label">Pronouns</InputLabel>
          <Select
            labelId="pronouns-select-label"
            value={pronouns}
            label="Pronouns"
            onChange={handleChange}
          >
            <MenuItem value={'She/Her'}>She/Her</MenuItem>
            <MenuItem value={'He/Him'}>He/Him</MenuItem>
            <MenuItem value={'They/Them'}>They/Them</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
            <MenuItem value={'Prefer Not to Answer'}>
              Prefer Not to Answer
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid mt={2} item xs={12}>
        <TextField
          required
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
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

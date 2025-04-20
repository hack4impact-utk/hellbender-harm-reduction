'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import { AccountCircle } from '@mui/icons-material';
import {
  Typography,
  TextField,
  Stack,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';

const pronouns = [
  'he/him',
  'she/her',
  'they/them',
  'not listed',
  'chose not to answer',
];

export interface SignUpBasicInfoProps {
  data: {
    name: string;
    image: string;
    pronouns: string;
  };
  onChange: (updated: Partial<SignUpBasicInfoProps['data']>) => void;
}

export function SignUpBasicInfo({ data, onChange }: SignUpBasicInfoProps) {
  return (
    <Box textAlign="center">
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          Tell us more about you!
        </Typography>
        <br></br>
        <Typography variant="body1" align="left">
          Name
        </Typography>
        <TextField
          required
          variant="filled"
          sx={{
            backgroundColor: '#4d6a48',
          }}
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <br></br>
        <Typography variant="body1" align="left">
          Pronouns
        </Typography>
        <TextField
          required
          select
          variant="filled"
          sx={{
            backgroundColor: '#4d6a48',
          }}
          value={data.pronouns}
          onChange={(e) => onChange({ pronouns: e.target.value })}
        >
          {pronouns.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <Typography variant="h5" align="center">
          Upload a profile image
        </Typography>
      </Stack>
      <IconButton aria-label="upload" component="label" size="large">
        {/* Image not implimented */}
        <AccountCircle fontSize="large" />
      </IconButton>
    </Box>
  );
}

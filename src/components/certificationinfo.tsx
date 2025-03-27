'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';

interface CertInfo {
  certName: string;
  certDescription: string;
}

interface CertificationInfoProps {
  data: CertInfo[];
}

export function CertificationInfo(props: CertificationInfoProps) {
  return (
    <Box>
      <Typography variant="h4" textAlign={'center'}>
        Interested In Learning More About Harm Reduction?
      </Typography>
      <br></br>
      <Box>
        {props.data.map((cert, index) => (
          <Box key={index}>
            <Typography variant="h5">{cert.certName}</Typography>
            <Typography>{cert.certDescription}</Typography>
            <FormControlLabel control={<Checkbox />} label="I'm Interested" />
            <br></br>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

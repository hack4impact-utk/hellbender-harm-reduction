// 'use client';
// import {
//   Stack,
//   Typography,
//   Grid,
//   FormControlLabel,
//   Checkbox,
// } from '@mui/material';

// interface SignUpReferralProps {
//   data: string[];
//   onChange: (selectedSources: string[]) => void;
// }

// export function SignUpReferral({ data, onChange }: SignUpReferralProps) {
//   return (
//     <Stack spacing={2}>
//       <Typography variant="h5" textAlign={'center'}>
//         How Did You Hear About Us?
//       </Typography>
//       <Grid container spacing={2} maxWidth={400} alignSelf={'center'}>
//         <Grid item xs={6} textAlign={'left'}>
//           <FormControlLabel control={<Checkbox />} label="Word of Mouth" />
//           <br></br>
//           <FormControlLabel control={<Checkbox />} label="Event" />
//           <br></br>
//           <FormControlLabel control={<Checkbox />} label="Social Media" />
//           <FormControlLabel
//             control={<Checkbox />}
//             label="Search Engine Result"
//           />
//         </Grid>
//         <Grid item xs={6} textAlign={'left'}>
//           <FormControlLabel control={<Checkbox />} label="School/University" />
//           <br></br>
//           <FormControlLabel control={<Checkbox />} label="Another Website" />
//           <br></br>
//           <FormControlLabel control={<Checkbox />} label="News/Newsletter" />
//           <FormControlLabel control={<Checkbox />} label="Poster" />
//         </Grid>
//       </Grid>
//     </Stack>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface SignUpReferralProps {
  data: string[];
  onChange: (selectedSources: string[]) => void;
}

export function SignUpReferral({ data, onChange }: SignUpReferralProps) {
  const [selectedSources, setSelectedSources] = useState<string[]>(data || []);

  useEffect(() => {
    setSelectedSources(data || []);
  }, [data]);

  // Notify parent *only* when selectedEvents changes (not during render)
  useEffect(() => {
    onChange(selectedSources);
  }, [selectedSources]);

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const referralOptions = [
    'Word of Mouth',
    'Event',
    'Social Media',
    'Search Engine Result',
    'School/University',
    'Another Website',
    'News/Newsletter',
    'Poster',
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        How Did You Hear About Us?
      </Typography>
      <Grid container maxWidth={400} alignSelf={'center'}>
        {referralOptions.map((label) => (
          <Grid item xs={6} key={label}>
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={selectedSources.includes(label)}
                  onChange={() => toggleSource(label)}
                />
              }
              label={label}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

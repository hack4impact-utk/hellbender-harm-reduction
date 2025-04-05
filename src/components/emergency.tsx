'use client';
import { Box, Grid, Paper, Stack, styled, TextField } from '@mui/material';

// name, #, accoms
interface EmergencyInfoProps {
  name: string;
  phone: string;
  accommodations?: string[];
}

// Styling things
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

// display, email, phone, and accomms based on array
export function EmergencyInfo(props: EmergencyInfoProps) {
  return (
    <Stack spacing={2}>
      <h3>Email</h3>
      <TextField defaultValue={props.name} />
      <h3>Phone Number</h3>
      <TextField defaultValue={props.phone} />
      <h3>Accommodations</h3>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {(props.accommodations ?? []).map((index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <Item>{index}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

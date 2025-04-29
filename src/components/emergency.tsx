'use client';
import { Box, Grid, Paper, Stack, styled, Typography } from '@mui/material';

// name, #, accoms
interface EmergencyInfoProps {
  name?: string;
  phone?: string;
  accommodations?: string[];
}

// Styling things
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#42603c',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#f0f5ef',
}));

// display, email, phone, and accomms based on array
export function EmergencyInfo(props: EmergencyInfoProps) {
  return (
    <Stack spacing={2} sx={{ height: '100%', padding: '20px' }}>
      <Typography
        fontFamily="Verdana"
        fontWeight={'bold'}
        variant="h4"
        color="#f0f5ef"
      >
        Name
      </Typography>
      <Box
        sx={{
          height: '8%',
          backgroundColor: '#42603c',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '10px',
        }}
      >
        <Typography
          fontFamily="Verdana"
          variant="h6"
          color="#f0f5ef"
          sx={{ paddingLeft: '10px' }}
        >
          {props.name?.trim() || 'N/A'}
        </Typography>
      </Box>
      <Typography
        fontFamily="Verdana"
        fontWeight={'bold'}
        variant="h4"
        color="#f0f5ef"
      >
        Phone Number
      </Typography>
      <Box
        sx={{
          height: '8%',
          backgroundColor: '#42603c',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '10px',
        }}
      >
        <Typography
          fontFamily="Verdana"
          variant="h6"
          color="#f0f5ef"
          sx={{ paddingLeft: '10px' }}
        >
          {props.phone?.trim() || 'N/A'}
        </Typography>
      </Box>
      <Typography
        fontFamily="Verdana"
        fontWeight={'bold'}
        variant="h4"
        color="#f0f5ef"
      >
        Accommodations
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {props.accommodations && props.accommodations.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {props.accommodations.map((accom, i) => (
              <Grid item key={i} xs={12} sm={6} md={6}>
                <Item>{accom}</Item>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            fontFamily="Verdana"
            variant="h6"
            color="#f0f5ef"
            sx={{ mt: 1 }}
          >
            No Accommodations
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

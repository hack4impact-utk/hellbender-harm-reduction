import { Box, Typography } from '@mui/material';

interface events {
  number_events: number;
}

// literally just takes in a number and presents it in a nice little box.
// How do you want me to style this?
export function YearlyEvents(props: events) {
  const plurality: string = props.number_events === 1 ? 'Event' : 'Events';
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyItems="center"
      alignItems="center"
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        You&apos;ve Signed Up For
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {props.number_events}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {plurality} This Year!
      </Typography>
    </Box>
  );
}

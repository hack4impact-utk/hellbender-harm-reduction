import { Box, Typography } from '@mui/material';

interface events {
  number_events: number;
}

// literally just takes in a number and presents it in a nice little box.
export function YearlyEvents(props: events) {
  const plurality: string = props.number_events === 1 ? 'Event' : 'Events';
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyItems="center"
      alignItems="center"
    >
      <Typography
        variant="h6"
        fontFamily="Verdana"
        sx={{ textAlign: 'center', color: '#f0f5ef' }}
      >
        You&apos;ve Signed Up For
      </Typography>
      <Typography
        variant="h4"
        fontFamily="Verdana"
        sx={{ fontWeight: 'bold', textAlign: 'center', color: '#f0f5ef' }}
      >
        {props.number_events}
      </Typography>
      <Typography
        variant="h6"
        fontFamily="Verdana"
        sx={{ textAlign: 'center', color: '#f0f5ef' }}
      >
        {plurality} This Year!
      </Typography>
    </Box>
  );
}

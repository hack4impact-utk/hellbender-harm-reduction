'use client';
import { Box, Typography, Stack } from '@mui/material';

interface VolsRegisteredProps {
  amount: number;
}

export default function VolsRegistered(props: VolsRegisteredProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f5ef',
        border: '2px solid',
        borderColor: '#42603c',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Stack>
        <Typography fontFamily={'Verdana'} color={'#42603c'}>
          There are currently
        </Typography>
        <Typography
          fontSize={'20px'}
          fontWeight={'bold'}
          fontFamily={'Verdana'}
          color={'#42603c'}
        >
          {props.amount}
        </Typography>
        <Typography fontFamily={'Verdana'} color={'#42603c'}>
          volunteers registered
        </Typography>
      </Stack>
    </Box>
  );
}

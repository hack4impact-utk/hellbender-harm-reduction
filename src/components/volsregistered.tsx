'use client';
import { Box, Typography, Stack } from '@mui/material';

interface VolsRegisteredProps {
  amount: number;
}

// function that prints out the number of volunteers currently registered
export default function VolsRegistered(props: VolsRegisteredProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f5ef',
        border: '2px solid',
        borderColor: '#42603c',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '45%',
      }}
    >
      <Stack>
        <Typography fontFamily={'Verdana'} color={'#42603c'} fontSize="30px">
          There are currently
        </Typography>
        <Typography
          fontSize={'70px'}
          fontWeight={'bold'}
          fontFamily={'Verdana'}
          color={'#42603c'}
          py="10px"
        >
          {props.amount}
        </Typography>
        <Typography fontFamily={'Verdana'} color={'#42603c'} fontSize="30px">
          volunteers registered
        </Typography>
      </Stack>
    </Box>
  );
}

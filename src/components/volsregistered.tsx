'use client';
import { Box, Typography, Stack } from '@mui/material';

interface VolsRegieredProps {
  amount: number;
}

export default function VolsRegistered(props: VolsRegieredProps) {
  return (
    <Box>
      <Stack>
        <Typography>There are currently</Typography>
        <Typography>{props.amount}</Typography>
        <Typography>volunteers registered</Typography>
      </Stack>
    </Box>
  );
}

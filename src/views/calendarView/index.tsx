'use client';
import NavBar from '@/components/navbar';
import { Box } from '@mui/material';
import CalendarComp from '@/components/usercalendar';
import hhrColors from '@/utils/hhr-theme';
import { alpha } from '@mui/material/styles';

export default function CalendarView() {
  return (
    <Box
      sx={{
        backgroundColor: alpha(hhrColors.palette.hhr.light, 1),
      }}
    >
      {/* Top Navigation Bar */}
      <NavBar></NavBar>
      <CalendarComp />
    </Box>
  );
}

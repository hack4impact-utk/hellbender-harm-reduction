import NavBar from '@/components/navbar';
import { Box } from '@mui/material';
import CalendarComp from '@/components/usercalendar';

export default function CalendarView() {
  return (
    <Box>
      {/* Top Navigation Bar */}
      <NavBar></NavBar>
      <CalendarComp />
    </Box>
  );
}

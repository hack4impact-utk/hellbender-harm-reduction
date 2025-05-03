import { getAllEvents } from '@/server/actions/event';
import CalendarView from '@/views/calendarView';
import { Typography } from '@mui/material';

// page function
export default async function Home() {
  // all event data
  const eventdata = await getAllEvents();

  // in case get call fails
  if (!eventdata) {
    return <Typography>No Found Events, No Calendar</Typography>;
  }

  // only get needed event data, will probably need to change for when we add popup when an event is clicked
  const calendardata = eventdata.map((event) => {
    return {
      title: event.eventName,
      start: new Date(event.eventStart),
      end: new Date(event.eventEnd),
    };
  });

  // return page
  return (
    <div>
      <CalendarView events={calendardata} />
    </div>
  );
}

import { getAllEvents } from '@/server/actions/event';
import VolunteerDashView from '@/views/volunteerDashView';
import { Typography } from '@mui/material';
import { getAllFacts } from '@/server/actions/facts';

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

  // gets fun facts
  const allfacts = await getAllFacts();
  const facts = allfacts.map((item) => item.fact);

  // return page
  return (
    <div>
      <VolunteerDashView events={calendardata} facts={facts} />
    </div>
  );
}

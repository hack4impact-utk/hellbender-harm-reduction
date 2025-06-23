import { getAllEvents } from '@/server/actions/event';
import VolunteerDashView from '@/views/volunteerDashView';
import { Typography } from '@mui/material';
import { getAllFacts } from '@/server/actions/facts';
import { getUser } from '@/server/actions/user';

// page function
export default async function Home() {
  // gets current user (change when login is working)
  const userdata = await getUser('681439a152a6f8d14f5ec44b');

  // in case call fails
  if (!userdata) {
    return <Typography>User Not Found</Typography>;
  }

  const userEvents = (userdata.events ?? []).map((etag) => String(etag.uevent));

  // all event data
  const eventdata = await getAllEvents();

  // in case get call fails
  if (!eventdata) {
    return <Typography>No Found Events, No Calendar</Typography>;
  }

  // only get needed event data, will probably need to change for when we add popup when an event is clicked
  const calendardata = eventdata
    .filter((event) => userEvents.includes(String(event._id)))
    .map((event) => {
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

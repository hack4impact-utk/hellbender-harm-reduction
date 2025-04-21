import { getAllEvents } from '@/server/actions/event';
import { getTag } from '@/server/actions/tag';
import { Typography } from '@mui/material';
import EventListView from '@/views/eventListView';

export default async function Home() {
  // gets all events
  const allevents = await getAllEvents();

  // error if can't get any events
  if (!allevents) {
    return <Typography>No Events Found</Typography>;
  }

  // collects data, saves tagname in requirement and preference arrays instead of the tag id
  const cleanData = await Promise.all(
    allevents.map(async (event: any) => {
      const eventRequirements = await Promise.all(
        (event.eventRequirements || []).map(async (req: any) => {
          const tagIdString = String(req);
          const utagName = await getTag(tagIdString);
          return utagName ? utagName.tagName : null;
        })
      );
      const eventPreferences = await Promise.all(
        (event.eventPreferences || []).map(async (pref: any) => {
          const tagIdString = String(pref);
          const utagName = await getTag(tagIdString);
          return utagName ? utagName.tagName : null;
        })
      );

      return {
        eventName: event.eventName,
        eventStart: event.eventStart,
        eventEnd: event.eventEnd,
        eventDescription: event.eventDescription,
        eventType: event.eventType,
        eventRequirements: eventRequirements.filter((tag: any) => tag !== null),
        eventPreferences: eventPreferences.filter((tag: any) => tag !== null),
      };
    })
  );

  return <EventListView events={cleanData} />;
}

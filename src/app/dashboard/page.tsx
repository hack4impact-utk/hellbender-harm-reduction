import { getAllEvents } from '@/server/actions/event';
import { getTag } from '@/server/actions/tag';
import { Typography } from '@mui/material';
import AdminDashView from '@/views/adminDashView';
import { getAllUsers } from '@/server/actions/user';

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
        id: String(event._id),
      };
    })
  );

  const calendardata = allevents.map((event) => {
    return {
      title: event.eventName,
      start: event.eventStart,
      end: event.eventEnd,
      description: String(event._id),
    };
  });

  // gets user info for all volunteers
  const userdata = await getAllUsers();

  // gets user info for volunteers by event
  const cleanUser = await Promise.all(
    userdata.map(async (user) => {
      const userTags = await Promise.all(
        (user.userTags || []).map(async (userTag) => {
          const tagIdString = String(userTag.tag);
          const utagName = await getTag(tagIdString);
          return utagName
            ? { tagProf: userTag.tagProf, tag: utagName.tagName }
            : null;
        })
      );

      const eventIds = (user.events || []).map((eventObj) =>
        String(eventObj.uevent)
      );

      return {
        name: user.name,
        phone: user.phone,
        email: user.email,
        pronouns: user.pronouns,
        accomm: user?.accomm,
        otherAccomm: user?.otherAccomm,
        userTags: userTags.filter((tag) => tag !== null),
        emergencyContacts: user.emergencyContacts
          ? JSON.parse(JSON.stringify(user.emergencyContacts))
          : [],
        events: eventIds,
      };
    })
  );

  const now = new Date();
  const soonEvent =
    cleanData
      .filter((event) => event.eventStart > now)
      .sort((a, b) => a.eventStart - b.eventStart)[0] ?? null;

  return (
    <div>
      <AdminDashView
        listevents={cleanData}
        calevents={calendardata}
        recentEvent={soonEvent}
        users={cleanUser}
      />
    </div>
  );
}

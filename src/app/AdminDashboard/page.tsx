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

  // collects event data for dasheventlist component, saves tagname in requirement and preference arrays instead of the tag id
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

  // gets event data for the calendar component
  const calendardata = allevents.map((event) => {
    return {
      title: event.eventName,
      start: new Date(event.eventStart),
      end: new Date(event.eventEnd),
      description: String(event._id),
    };
  });

  // gets all users
  const userdata = await getAllUsers();

  // cleans user info and gets info needed for volunteer list
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

  // gets soonest upcoming event
  const now = new Date();
  const soonEvent =
    cleanData
      .filter((event) => new Date(event.eventStart) > now)
      .sort(
        (a, b) =>
          new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
      )[0] ?? null;

  // returns actual page
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

import VolunteersView from '@/views/volunteersView';
import { getAllUsers } from '@/server/actions/user';
import { getAllEvents } from '@/server/actions/event';
import { getTag } from '@/server/actions/tag';

export default async function Home() {
  // gets user info for all volunteers
  const userdata = await getAllUsers();
  const safeUsers = userdata.map((user) => JSON.parse(JSON.stringify(user)));

  // gets user info for volunteers by event
  const cleanData = await Promise.all(
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

  // gets event info for volunteers by event
  const events = await getAllEvents();
  const filtevents = events.map((event) => {
    return {
      id: String(event._id),
      eventName: event.eventName,
      start: event.eventStart,
      end: event.eventEnd,
    };
  });

  // returns actual page
  return (
    <div>
      <VolunteersView
        alldata={safeUsers}
        userdata={cleanData}
        eventdata={filtevents}
      />
    </div>
  );
}

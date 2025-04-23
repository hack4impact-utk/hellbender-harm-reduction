import VolunteersView from '@/views/volunteersView';
import { getAllUsers } from '@/server/actions/user';
import { getAllEvents } from '@/server/actions/event';
import { getTag } from '@/server/actions/tag';

export default async function Home() {
  const userdata = await getAllUsers();
  const safeUsers = userdata.map((user) => JSON.parse(JSON.stringify(user)));
  const users = await getAllUsers();

  const cleanData = await Promise.all(users.map(async (user) => {
    const userTags = await Promise.all(
      (user.userTags || []).map(async (userTag) => {
        const tagIdString = String(userTag.tag);
        const utagName = await getTag(tagIdString);
        return utagName ? { tagProf: userTag.tagProf, tag: utagName.tagName } : null;
      })
    );

    const eventIds = (user.events || []).map(eventObj => String(eventObj.uevent));
  
    return {
      name: user.name,
      phone: user.phone,
      email: user.email,
      pronouns: user.pronouns,
      accomm: user?.accomm,
      otherAccomm: user?.otherAccomm,
      userTags: userTags.filter(tag => tag !== null),
      emergencyContacts: user.emergencyContacts 
      ? JSON.parse(JSON.stringify(user.emergencyContacts)) 
      : [],
        events: eventIds
    };
  }));

  const events = await getAllEvents();
  const filtevents = events.map((event) => {
    return {
      id: String(event._id),
      eventName: event.eventName,
      start: event.eventStart,
      end: event.eventEnd,
    };
  });


  return (
    <div>
      <VolunteersView alldata={safeUsers} userdata={cleanData} eventdata={filtevents}/>
    </div>
  );
}

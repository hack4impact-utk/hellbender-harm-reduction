import VolunteersView from '@/views/volunteersView';
import { getAllUsers } from '@/server/actions/user';
import { getAllEvents } from '@/server/actions/event';
import { getTag } from '@/server/actions/tag';
import { EventTypeEnum } from '@/types/event';
import { getEvent } from '@/server/actions/event';
import { getAllFacts } from '@/server/actions/facts';

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

  // gets count of currently registered volunteers
  const count = userdata.filter((user) => user.userType === 'Volunteer').length;

  // gets data for referral sources bar graph
  const refCounts: Record<string, number> = {};
  userdata.forEach((user) => {
    if (user.referrals && Array.isArray(user.referrals)) {
      user.referrals.forEach((referral) => {
        refCounts[referral] = (refCounts[referral] || 0) + 1;
      });
    }
  });
  const refs = Object.entries(refCounts).map(([source, count]) => ({
    source,
    count,
  }));

  // gets data for preferred events bar chart
  const eventCounts: Record<string, number> = {};
  userdata.forEach((user) => {
    if (user.eventPreferences && Array.isArray(user.eventPreferences)) {
      user.eventPreferences.forEach((event) => {
        eventCounts[event] = (eventCounts[event] || 0) + 1;
      });
    }
  });
  const eventTypeCount = Object.entries(eventCounts).map(([type, count]) => ({
    type,
    count,
  }));

  // gets information for event types per year pie chart
  let startingYear: number = 99999;
  const eventsPerYear = new Map<number, Map<EventTypeEnum, number>>();
  const totalsPerYear = new Map<number, number>();
  const allEventIds = userdata
    .flatMap((user) => user.events || [])
    .map((eventObj) => eventObj.uevent.toString());
  const fetchedEvents = await Promise.all(allEventIds.map(getEvent));
  for (const e of fetchedEvents) {
    if (!e) continue;

    const year = e.eventStart.getFullYear();
    startingYear = Math.min(startingYear, year);

    if (!eventsPerYear.has(year)) {
      eventsPerYear.set(year, new Map());
    }

    const typeMap = eventsPerYear.get(year)!;
    typeMap.set(e.eventType, (typeMap.get(e.eventType) ?? 0) + 1);

    totalsPerYear.set(year, (totalsPerYear.get(year) ?? 0) + 1);
  }
  const dist = {
    event_years_start: startingYear,
    event_types: eventsPerYear,
    event_total: totalsPerYear,
  };

  // puts all metrics data into one object
  const metrics = {
    volsregistered: count,
    distribution: dist,
    referrals: refs,
    prefevents: eventTypeCount,
  };

  // gets fun facts
  const allfacts = await getAllFacts();
  const facts = allfacts.map((item) => item.fact);

  // returns actual page
  return (
    <div>
      <VolunteersView
        alldata={safeUsers}
        userdata={cleanData}
        eventdata={filtevents}
        metrics={metrics}
        facts={facts}
      />
    </div>
  );
}

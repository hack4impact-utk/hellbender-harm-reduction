// import { getEvent } from '@/server/actions/event';
// import { getUser } from '@/server/actions/user';
// import { getAllTags, getTag } from '@/server/actions/tag';
import ProfileView from '@/views/profileView';
// import { Typography } from '@mui/material';

export default async function Home() {
  // const user = await getUser('681439a152a6f8d14f5ec44b');

  // if (!user) {
  //   return <Typography>User Not Found</Typography>;
  // }

  // const userTags = await Promise.all(
  //   (user.userTags || []).map(async (userTag) => {
  //     const tagIdString = String(userTag.tag);
  //     const utagName = await getTag(tagIdString);
  //     return utagName
  //       ? {
  //           tagId: tagIdString,
  //           tagProf: userTag.tagProf,
  //           tag: utagName.tagName,
  //         }
  //       : null;
  //   })
  // );

  // const cleanData = {
  //   name: user.name,
  //   phone: user.phone,
  //   image: user.image,
  //   email: user.email,
  //   userType: user.userType,
  //   eventPreferences: user.eventPreferences,
  //   reminders: user?.reminders,
  //   custReminders: (user?.custReminders ?? []).map((rem) =>
  //     JSON.parse(JSON.stringify(rem))
  //   ),
  //   newEvents: user.newEvents,
  //   referrals: user.referrals,
  //   pronouns: user.pronouns,
  //   accomm: user?.accomm,
  //   otherAccomm: user?.otherAccomm,
  //   userTags: userTags.filter(
  //     (tag): tag is NonNullable<typeof tag> => tag !== null
  //   ),
  //   emergencyContact: user.emergencyContacts
  //     ? JSON.parse(JSON.stringify(user.emergencyContacts))
  //     : [],
  // };

  // // Current year
  // const device_year: number = new Date().getUTCFullYear();

  // // Will return an empty one if getUser() returns null (though this shouldn't happen)
  // const events = user?.events ?? [];

  // // For each event in event array, call getEvent to access eventStart and extract the year.
  // // While doing so, check to see if each event matches current year, tracked using the keep flag.
  // // This try clause might be redundant, but the getEvent() function might return null
  // const filtered_events = (
  //   await Promise.all(
  //     events.map(async (event) => {
  //       try {
  //         const e = await getEvent(event.uevent.toString());
  //         const year: number = e?.eventStart.getUTCFullYear() ?? 0;
  //         return { keep: year === device_year, event };
  //       } catch (error) {
  //         console.log(error);
  //         return { keep: false, event };
  //       }
  //     })
  //   )
  // ).filter(({ keep }) => keep).length;

  // const alltags = await getAllTags();
  // const cleantags = alltags.map((tag) => JSON.parse(JSON.stringify(tag)));

  return (
    <div>
      <ProfileView />
    </div>
  );
}

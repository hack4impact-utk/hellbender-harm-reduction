import SignInForm from '@/components/signin';
import SignInUpView from '@/views/signInUpView';

/* Uncomment to test Code
import { YearlyEvents } from '@/components/yearlyevents';
import { UserResponse, zUserEvents } from '@/types/user';
import { getUser } from '@/server/actions/user';
import { getEvent } from '@/server/actions/event';

// I did have to add some events to MONGO with the corresponding UserID to test this
async function YearlyEventsCount(userID: string): Promise<number> {
  // Current year
  const device_year: number = new Date().getUTCFullYear();

  // Will return an empty one if getUser() returns null (though this shouldn't happen)
  const temp: UserResponse | null = await getUser(userID);
  const events: Zod.infer<typeof zUserEvents>[] = temp?.events ?? [];

  // For each event in event array, call getEvent to access eventStart and extract the year.
  // While doing so, check to see if each event matches current year, tracked using the keep flag.
  // This try clause might be redundant, but the getEvent() function might return null
  const filtered_events = (
    await Promise.all(
      events.map(async (event) => {
        try {
          const e = await getEvent(event.uevent.toString());
          const year: number = e?.eventStart.getUTCFullYear() ?? 0;
          return { keep: year === device_year, event };
        } catch (error) {
          console.log(error);
          return { keep: false, event };
        }
      })
    )
  ).filter(({ keep }) => keep).length;

  return filtered_events;
}
*/

export default async function Home() {
  /*
  // Anakin Skywalker
  const filtered_events: number = await YearlyEventsCount(
    '67daca61a3a78172a40ec740'
  );
  */

  return (
    <div>
      <div>
        <SignInUpView
          _form={<SignInForm email="" password="" />}
        ></SignInUpView>
      </div>
      {/* Testing code
      <div>
        <YearlyEvents number_events={filtered_events}></YearlyEvents>
      </div>
      */}
    </div>
  );
}

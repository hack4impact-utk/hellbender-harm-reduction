import { z } from 'zod';
import zBase from './base';
import { zEventEntity, zEventTypeEnum } from './event';
import { zTagEntity } from './tag';

export const userTypeEnum = ['Volunteer', 'Admin', 'Owner'] as const;
export const zUserTypeEnum = z.enum(userTypeEnum);

export const zEmergencyContact = z.object({
  name: z.string(),
  phone: z.string(),
});

export const referralSourceEnum = [
  'Word of Mouth',
  'Event',
  'Social Media',
  'Search Engine Result',
  'School/University',
  'Another Website',
  'News/Newsletter',
  'Poster',
] as const;
export const zreferralSourceEnum = z.enum(referralSourceEnum);

export const newEventNotifsEnum = [
  'All Events',
  'Preferred Events',
  'No Events',
] as const;
export const zNewEventNotifsEnum = z.enum(newEventNotifsEnum);

export const reminderNotifsEnum = [
  '30 Minutes Before',
  'Day Before',
  '2 Days Before',
  'A Week Before',
] as const;
export const zReminderNotifsEnum = z.enum(reminderNotifsEnum);

export const pronounEnum = [
  'he/him',
  'she/her',
  'they/them',
  'not listed',
  'chose not to answer',
] as const;
export const zPronounEnum = z.enum(pronounEnum);

export const accommEnum = [
  'Accessible Parking',
  'Service Dogs Allowed',
  'Sensory Space',
  'Large Print',
  'Wheelchair Accessible',
  'Provided Seating',
  'No Heavy Lifting',
  'Flexible Breaks',
  'Blind',
  'Deaf',
] as const;
export const zAccommEnum = z.enum(accommEnum);

export const tagProfEnum = [
  'Beginner',
  'Intermediate',
  'Expert',
  'N/A',
] as const;
export const zTagProfEnum = z.enum(tagProfEnum);

export const zCustomReminder = z.object({
  daysPrior: z.number(),
  time: z.string(),
});

export const zUserTag = z.object({
  tag: zTagEntity,
  tagProf: zTagProfEnum,
});

export const zUserEvents = z.object({
  uevent: zEventEntity,
  appDate: z.date(),
});

export const zUserBase = z.object({
  name: z.string(),
  email: z.string(),
  image: z.string(),
  userType: zUserTypeEnum,
  emergencyContacts: zEmergencyContact.optional(),
  pronouns: zPronounEnum,
  userTags: z.array(zUserTag).optional(),
  events: z.array(zUserEvents).optional(),
  phone: z.string(),
  eventPreferences: z.array(zEventTypeEnum),
  reminders: z.array(zReminderNotifsEnum).optional(),
  custReminders: z.array(zCustomReminder).optional(),
  newEvents: zNewEventNotifsEnum,
  referrals: z.array(zreferralSourceEnum),
  accomm: z.array(zAccommEnum).optional(),
  otherAccomm: z.string().optional(),
});

// Extend to create request, response, and entity types with zBase
export const zUserEntity = zUserBase.extend({ ...zBase.shape });
export const zUserRequest = zUserBase;
export const zUserResponse = zUserEntity;
export const zUpdateUserRequest = zUserRequest.partial();

//export { zUserBase, zUserRequest, zUserEntity, zUserResponse };
export interface UserEntity extends z.infer<typeof zUserEntity> {}
export type UserRequest = z.infer<typeof zUserRequest>;
export type UserResponse = z.infer<typeof zUserResponse>;
export type UpdateUserRequest = z.infer<typeof zUpdateUserRequest>;

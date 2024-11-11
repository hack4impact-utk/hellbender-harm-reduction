import { z } from 'zod';
import zBase from './base';
import { zEventEntity, zEventTypeEnum } from './event';

export const userTypeEnum = ['Volunteer', 'Admin', 'Owner'] as const;
export const zUserTypeEnum = z.enum(userTypeEnum);

export const zEmergencyContact = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string().optional(),
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

export const zCustomReminder = z.object({
  daysPrior: z.number(),
  time: z.string(),
});

export const zCertification = z.object({
  certTitle: z.string(),
  certImage: z.string().optional(),
  certDescription: z.string(),
  dateReceived: z.date(),
  dateExpiration: z.date().optional(),
});

export const zUserBase = z.object({
  name: z.string(),
  email: z.string(),
  image: z.string().optional(),
  userType: zUserTypeEnum,
  emergencyContacts: z.array(zEmergencyContact).optional(),
  pronouns: z.string().optional(),
  certifications: z.array(zCertification).optional(),
  events: z.array(zEventEntity).optional(),
  phone: z.string(),
  eventPreferences: z.array(zEventTypeEnum),
  reminders: z.array(zReminderNotifsEnum),
  custRemindsers: z.array(zCustomReminder).optional(),
  newEvents: zNewEventNotifsEnum,
  referrals: z.array(zreferralSourceEnum),
});

// Extend to create request, response, and entity types with zBase
const zUserEntity = zUserBase.extend({ ...zBase.shape });
const zUserRequest = zUserBase;
const zUserResponse = zUserEntity;

//export { zUserBase, zUserRequest, zUserEntity, zUserResponse };
export interface UserEntity extends z.infer<typeof zUserEntity> {}
export interface UserRequest extends z.infer<typeof zUserRequest> {}
export interface UserReponse extends z.infer<typeof zUserResponse> {}

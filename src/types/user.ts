import { z } from 'zod';
import zBase from './base';
import { zEventEntity, zEventTypeEnum } from './event';
import { zCertEntity, zCertTypeEnum } from './certification';

export const userTypeEnum = ['Volunteer', 'Admin', 'Owner'] as const;
export const zUserTypeEnum = z.enum(userTypeEnum);

export const zEmergencyContact = z.object({
  name: z.string(),
  mobile_phone: z.string(),
  work_phone: z.string().optional(),
  email: z.string().optional(),
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

export const pronounEnum = [
  'he/him',
  'she/her',
  'they/them',
  'chose not to answer',
] as const;
export const zPronounEnum = z.enum(pronounEnum);

export const certProgressEnum = ['Pending', 'Approved', 'Denied'] as const;
export const zCertProgressEnum = z.enum(certProgressEnum);

export const certProfEnum = [
  'Beginner',
  'Intermediate',
  'Expert',
  'N/A',
] as const;
export const zCertProfEnum = z.enum(certProfEnum);

export const zCustomReminder = z.object({
  daysPrior: z.number(),
  time: z.string(),
});

export const zCertification = z.object({
  certification: zCertEntity,
  certType: zCertTypeEnum,
  certProgress: zCertProgressEnum,
  certProf: zCertProfEnum,
  dateReceived: z.date(),
  dateExpiration: z.date().optional(),
});

export const zUserBase = z.object({
  name: z.string(),
  email: z.string(),
  image: z.string(),
  userType: zUserTypeEnum,
  emergencyContacts: z.array(zEmergencyContact).optional(),
  pronouns: zPronounEnum,
  certifications: z.array(zCertification).optional(),
  events: z.array(zEventEntity).optional(),
  phone: z.string(),
  eventPreferences: z.array(zEventTypeEnum),
  reminders: z.array(zReminderNotifsEnum).optional(),
  custReminders: z.array(zCustomReminder).optional(),
  newEvents: zNewEventNotifsEnum,
  referrals: z.array(zreferralSourceEnum),
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

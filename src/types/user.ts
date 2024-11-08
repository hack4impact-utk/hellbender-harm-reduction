import { z } from 'zod';
import zBase from './base';

const userTypeEnum = z.enum(['Volunteer', 'Admin', 'Owner']);

const zEmergencyContact = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string().optional(),
});

const referralSourceEnum = z.enum([
  'Word of Mouth',
  'Event',
  'Social Media',
  'Search Engine Result',
  'School/University',
  'Another Website',
  'News/Newsletter',
  'Poster',
]);

const newEventNotifsEnum = z.enum([
  'All Events',
  'Preferred Events',
  'No Events',
]);

const reminderNotifsEnum = z.enum([
  '30 Minutes Before',
  'Day Before',
  '2 Days Before',
  'A Week Before',
]);

const zCustomReminder = z.object({
  daysPrior: z.number().optional(),
  time: z.string().optional(),
});

const zCertification = z.object({
  certTitle: z.string(),
  certImage: z.string().optional(),
  certDescription: z.string(),
  dateReceived: z.date(),
  dateExpiration: z.date().optional(),
});

const zUserBase = z.object({
  name: z.string(),
  email: z.string(),
  image: z.string().optional(),
  userType: userTypeEnum,
  emergencyContacts: z.array(zEmergencyContact).optional(),
  pronouns: z.string().optional(),
  certifications: z.array(zCertification).optional(),
  events: z.array(z.string()), // add event pointer later
  phone: z.string(),
  eventPreferences: z.array(z.string()), // add event type pointer later
  reminders: z.array(reminderNotifsEnum),
  custRemindsers: z.array(zCustomReminder).optional(),
  newEvents: newEventNotifsEnum,
  referrals: z.array(referralSourceEnum),
});

// Extend to create request, response, and entity types with zBase
const zUserEntity = zUserBase.extend({ ...zBase.shape });
const zUserRequest = zUserBase;
const zUserResponse = zUserEntity;

export { zUserBase, zUserRequest, zUserEntity, zUserResponse };

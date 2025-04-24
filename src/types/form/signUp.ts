import { z } from 'zod';
import { zUserTag } from '../user';

export const zSignUpFormData = z.object({
  name: z.string().min(1, { message: 'Required' }),
  image: z.string().min(1, { message: 'Required' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .min(1, { message: 'Required' }),
  phone: z.string().min(1, { message: 'Required' }),
  pronouns: z.string().min(1, { message: 'Required' }),

  emergencyContact: z.object({
    ecName: z.string().min(1, { message: 'Required' }),
    ecPhone: z.string().min(1, { message: 'Required' }),
  }),

  userTags: z.array(zUserTag),
  eventPreferences: z.array(z.string()),
  wantsNewEventNotifications: z.boolean(),

  certifications: z.array(
    z.object({
      certName: z.string().min(1, { message: 'Required' }),
      certDescription: z.string().min(1, { message: 'Required' }),
    })
  ),

  referralSource: z.string().optional(),
  accomm: z.array(z.string()).optional(),
  otherAccomm: z.string().optional(),
});

export type SignUpFormData = z.infer<typeof zSignUpFormData>;

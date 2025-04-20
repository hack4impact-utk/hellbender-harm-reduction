import { z } from 'zod';

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

  languages: z.array(z.string()),
  eventPreferences: z.array(z.string()),
  wantsNewEventNotifications: z.boolean(),

  certifications: z.array(
    z.object({
      certName: z.string().min(1, { message: 'Required' }),
      certDescription: z.string().min(1, { message: 'Required' }),
    })
  ),

  referralSource: z.string().optional(),
  accommodations: z.array(z.string()),
});

export type SignUpFormData = z.infer<typeof zSignUpFormData>;

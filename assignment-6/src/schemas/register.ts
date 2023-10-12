import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z.string().trim(),
    email: z.string().trim().email(),
    password: z
      .string()
      .trim()
      .min(8, 'Password must contain at least 8 characters!')
      .regex(/.*[A-Z].*/, 'Password must contain one uppercase character')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        'Password must contain one symbol',
      ),
    passwordConfirmation: z
      .string()
      .trim()
      .min(8, 'Password must contain at least 8 characters!')
      .regex(/.*[A-Z].*/, 'Password must contain one uppercase character')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        'Password must contain one symbol',
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>

import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const parentAccountSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  agreeTerms: z.boolean().refine((v) => v === true, { message: 'You must agree to the Terms of Service' }),
  agreeAge: z.boolean().refine((v) => v === true, { message: 'You must confirm you are 18 or older' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const childProfileSchema = z.object({
  childName: z.string().min(2, { message: 'Child name must be at least 2 characters' }),
  gender: z.string().min(1, { message: 'Please select a gender' }),
  dateOfBirth: z.string().min(1, { message: 'Please enter a date of birth' }),
  avatar: z.string().min(1, { message: 'Please select an avatar' }),
  childEmail: z.string().email({ message: 'Invalid email address' }),
  childPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmChildPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  difficulty: z.string().min(1, { message: 'Please select a difficulty' }),
}).refine((data) => data.childPassword === data.confirmChildPassword, {
  message: "Passwords don't match",
  path: ['confirmChildPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1, { message: 'Refresh token is required' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type ParentAccountSchema = z.infer<typeof parentAccountSchema>;
export type ChildProfileSchema = z.infer<typeof childProfileSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;

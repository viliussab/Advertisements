import zod from 'zod';

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

export type Login = zod.TypeOf<typeof loginSchema>;

import z from "zod";

export type NewUser = {
  fullName: string;
  email: string;
  passwordHash: string;
};

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export type RegisterNewUser = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginNewUser = z.infer<typeof LoginUserSchema>;

export type JwtPayload = {
  userId: string;
};

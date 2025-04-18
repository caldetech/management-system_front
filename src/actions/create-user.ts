"use server";

import { z } from "zod";
import { createUser } from "@/http/create-user";

const signUpSchema = z
  .object({
    inviteId: z.string().optional(),
    name: z.string().refine((value) => value.split(" ").length > 1, {
      message: "Please, enter your full name.",
    }),
    email: z.string().email({
      message: "Please, provide an valid e-mail address.",
    }),
    password: z.string().min(6, {
      message: "Password should have least 6 characters.",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password confirmation does not match.",
    path: ["password_confirmation"],
  });

export async function createUserAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: null,
      errors,
    };
  }

  const { name, email, password, inviteId } = result.data;

  await createUser({
    name,
    email,
    password,
    inviteId,
  });

  return {
    success: true,
    message: null,
    errors: null,
  };
}

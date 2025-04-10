"use server";

import type { Role } from "@/schemas/role";
import { api } from "../lib/api-client";

interface createInviteProps {
  email: string;
  role: Role;
  slug: string;
}

export async function createInvite({ email, role, slug }: createInviteProps) {
  try {
    await api.post("invite/create", {
      json: {
        email,
        role,
        slug,
      },
    });

    return {
      success: true,
      message: "Convite criado com sucesso!",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao criar o convite.",
    };
  }
}

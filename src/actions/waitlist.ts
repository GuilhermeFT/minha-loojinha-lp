"use server";

import { registerWaitlist as registerWaitlistService } from "@/services/google/create";
import { waitlistSchema } from "@/services/google/create";

export async function submitWaitlist(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const result = waitlistSchema.safeParse({ name, email });
  if (!result.success) {
    const first = result.error.flatten().fieldErrors;
    return {
      ok: false,
      message: first.email?.[0] ?? first.name?.[0] ?? "Preencha nome e e-mail.",
    };
  }
  try {
    await registerWaitlistService(result.data);
    return { ok: true, message: "Cadastrado! Em breve entraremos em contato." };
  } catch {
    return { ok: false, message: "Erro ao cadastrar. Tente de novo." };
  }
}

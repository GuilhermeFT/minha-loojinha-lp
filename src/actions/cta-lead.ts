"use server";

import { registerCtaLead as registerCtaLeadService } from "@/services/google/create";
import { ctaLeadSchema } from "@/services/google/create";

export async function submitCtaLead(formData: FormData) {
  const name = (formData.get("name") as string) ?? "";
  const email = (formData.get("email") as string) ?? "";
  const phone = (formData.get("phone") as string) ?? "";
  const result = ctaLeadSchema.safeParse({ name, email, phone });


  if (!result.success) {
    const first = result.error.flatten().fieldErrors;
    return {
      ok: false,
      message:
        first.email?.[0] ?? first.name?.[0] ?? "Preencha nome e e-mail.",
    };
  }
  try {
    await registerCtaLeadService(result.data);
    return { ok: true, message: "Cadastrado! Entraremos em contato." };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Erro ao cadastrar. Tente de novo." };
  }
}

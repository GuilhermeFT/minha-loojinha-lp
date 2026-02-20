"use server";

import { registerFeedback as registerFeedbackService } from "@/services/google/create";
import { feedbackSchema } from "@/services/google/create";

export async function submitFeedback(formData: FormData) {
  const text = (formData.get("text") as string) ?? "";
  const result = feedbackSchema.safeParse({ text });
  if (!result.success) {
    const first = result.error.flatten().fieldErrors;
    return {
      ok: false,
      message: first.text?.[0] ?? "Texto inválido.",
    };
  }
  try {
    await registerFeedbackService(result.data);
    return { ok: true, message: "Obrigado! Seu feedback foi enviado." };
  } catch {
    return { ok: false, message: "Erro ao enviar. Tente de novo." };
  }
}

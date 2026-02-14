import { z } from "zod";
import { env } from "@/env";
import { getAuthenticatedSheet } from "./auth";

export const leadSchema = z.object({
  name: z.string("Nome é obrigatório").min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string("Email é obrigatório").email("Email inválido"),
  expectations: z
    .string("Expectativas são obrigatórias")
    .min(3, "Expectativas devem ter no mínimo 3 caracteres"),
});

export type Lead = z.infer<typeof leadSchema>;

export const waitlistSchema = z.object({
  name: z.string("Nome é obrigatório").min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string("Email é obrigatório").email("Email inválido"),
});

export type WaitlistLead = z.infer<typeof waitlistSchema>;

export const registerLead = async (data: Lead) => {
  const sheet = await getAuthenticatedSheet();
  await sheet.spreadsheets.values.append({
    spreadsheetId: env.SHEET_ID,
    range: "A1:D1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [data.name, data.email, data.expectations, new Date().toISOString()],
      ],
    },
  });
};

export const registerWaitlist = async (data: WaitlistLead) => {
  const sheet = await getAuthenticatedSheet();
  await sheet.spreadsheets.values.append({
    spreadsheetId: env.SHEET_ID,
    range: "A1:C1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.name, data.email, new Date().toISOString()]],
    },
  });
};

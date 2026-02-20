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

export const ctaLeadSchema = z.object({
  name: z.string("Nome é obrigatório").min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string("Email é obrigatório").email("Email inválido"),
  phone: z.string().optional().default(""),
});

export type CtaLead = z.infer<typeof ctaLeadSchema>;

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
    range: "A1:D1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.name, data.email, "", new Date().toISOString()]],
    },
  });
};

export const registerCtaLead = async (data: CtaLead) => {
  const sheet = await getAuthenticatedSheet();

  await sheet.spreadsheets.values.append({
    spreadsheetId: env.SHEET_ID,
    range: "A1:D1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.name, data.email, data.phone ?? "", new Date().toISOString()]],
    },
  });
};

export const feedbackSchema = z.object({
  text: z.string().max(2000, "Máximo 2000 caracteres").optional().default(""),
});

export type Feedback = z.infer<typeof feedbackSchema>;

async function ensureFeedbackSheetExists() {
  const sheet = await getAuthenticatedSheet();
  const meta = await sheet.spreadsheets.get({
    spreadsheetId: env.SHEET_ID,
    fields: "sheets.properties.title",
  });
  const hasFeedback = meta.data.sheets?.some(
    (s) => s.properties?.title === "Feedback"
  );
  if (!hasFeedback) {
    await sheet.spreadsheets.batchUpdate({
      spreadsheetId: env.SHEET_ID,
      requestBody: {
        requests: [
          { addSheet: { properties: { title: "Feedback" } } },
        ],
      },
    });
  }
}

export const registerFeedback = async (data: Feedback) => {
  const sheet = await getAuthenticatedSheet();
  const payload = {
    spreadsheetId: env.SHEET_ID,
    range: "Feedback!A1:B1",
    valueInputOption: "USER_ENTERED" as const,
    requestBody: {
      values: [[data.text || "(sem texto)", new Date().toISOString()]],
    },
  };

  try {
    await sheet.spreadsheets.values.append(payload);
  } catch {
    await ensureFeedbackSheetExists();
    await sheet.spreadsheets.values.append(payload);
  }
};

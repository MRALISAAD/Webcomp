import { z } from "zod";

const phonePattern = /^[\d()+.\s-]{8,20}$/;

const baseSchema = z
  .object({
    fullName: z.string().trim().min(3, "Nom trop court").optional(),
    name: z.string().trim().min(3, "Nom trop court").optional(),
    email: z.string().trim().email("Adresse email invalide"),
    phone: z.string().trim().regex(phonePattern, "Numéro de téléphone invalide").optional(),
    subject: z.string().trim().max(120, "Sujet trop long"),
    message: z.string().trim().min(10, "Message trop court").max(4000, "Message trop long"),
    preferredLanguage: z.enum(["fr", "en", "ar"]).optional(),
    pack: z.string().trim().optional(),
    company: z.string().trim().optional(),
    source: z.string().trim().max(120, "Source invalide").optional(),
    honeypot: z.string().max(0).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (!data.fullName && !data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nom requis",
        path: ["fullName"],
      });
    }
  })
  .transform((data) => {
    const { name, honeypot, preferredLanguage, ...rest } = data;
    return {
      ...rest,
      fullName: rest.fullName || name || "",
      preferredLanguage: (preferredLanguage || "fr").toLowerCase(),
    };
  });

export const contactSchema = baseSchema;

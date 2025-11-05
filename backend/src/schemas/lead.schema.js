import { z } from "zod";
import { resolvePack } from "../utils/packs.js";

const phonePattern = /^[\d()+.\s-]{8,20}$/;

const optionalTrimmedString = (max = undefined) => {
  let schema = z.string().trim();
  if (max) {
    schema = schema.max(max, `Maximum ${max} characters`);
  }
  return schema.optional().transform((val) => (val && val.length ? val : undefined));
};

const leadSchemaBase = z
  .object({
    fullName: z.string().trim().min(3, "Nom trop court").optional(),
    name: z.string().trim().min(3, "Nom trop court").optional(),
    email: z.string().trim().email("Adresse email invalide"),
    phone: z
      .string()
      .trim()
      .regex(phonePattern, "Numéro de téléphone invalide"),
    arrivalDate: optionalTrimmedString(),
    airport: optionalTrimmedString(120),
    city: optionalTrimmedString(120),
    country: optionalTrimmedString(120),
    pack: z.string().trim().min(2, "Pack requis"),
    people: z.union([z.number().int().positive(), z.string().trim()]).optional(),
    message: optionalTrimmedString(2000),
    locale: z.enum(["fr", "en", "ar"]).optional(),
    source: optionalTrimmedString(120),
    url: z.string().trim().url().optional(),
    utm: z.record(z.string()).optional(),
    honeypot: z.string().max(0).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (!data.fullName && !data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nom complet requis",
        path: ["fullName"],
      });
    }

    if (data.people && typeof data.people === "string") {
      const parsed = Number.parseInt(data.people, 10);
      if (Number.isNaN(parsed) || parsed < 1 || parsed > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nombre de personnes invalide",
          path: ["people"],
        });
      }
    }
  })
  .transform((data) => {
    const { name, honeypot, people, locale, utm, ...rest } = data;
    const pack = resolvePack(rest.pack);
    const parsedPeople =
      typeof people === "number"
        ? people
        : people
        ? Number.parseInt(people, 10)
        : undefined;

    return {
      ...rest,
      fullName: rest.fullName || name || "",
      pack: pack.slug,
      packLabel: pack.label,
      people: parsedPeople,
      locale: (locale || "fr").toLowerCase(),
      utm: utm || {},
    };
  });

export const leadSchema = leadSchemaBase;

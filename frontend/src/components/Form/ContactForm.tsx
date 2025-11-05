import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useZohoForm } from "../../hooks/useZohoForm";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const packOptions = ["", "Essentiel", "Confort", "Premium"] as const;

const formSchema = z.object({
  fullName: z.string().trim().min(2, "form.errors.fullName"),
  email: z.string().email("form.errors.email"),
  phone: z
    .string()
    .trim()
    .min(8, "form.errors.phone")
    .max(20, "form.errors.phone"),
  country: z.string().optional().transform((value) => value?.trim() ?? ""),
  desiredPack: z.enum(packOptions),
  message: z.string().trim().min(20, "form.errors.message"),
  consent: z.boolean().refine((val) => val === true, {
    message: "form.errors.consent",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface ContactFormProps {
  defaultPack?: "" | "Essentiel" | "Confort" | "Premium";
}

const ContactForm = ({ defaultPack }: ContactFormProps) => {
  const { t } = useTranslation();
  const { submitLead, isLoading } = useZohoForm();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const fieldClass =
    "!w-full !rounded-lg !border !border-gray-200 !bg-white !p-3 !text-[#0A2239] !shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:!border-[#1E3A5F] dark:!bg-[#0A2239] dark:!text-[#EAEAEA] dark:focus-visible:ring-offset-[#0A2239]";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormSchema>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      desiredPack: defaultPack ?? "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    try {
      const response = await submitLead({
        ...values,
        fullName: values.fullName.trim(),
        message: values.message.trim(),
      });

      if (response?.success) {
        setStatus("success");
        reset({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          desiredPack: defaultPack ?? "",
          message: "",
          consent: false,
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      // Error handled by status state
      setStatus("error");
    }
  });

  useEffect(() => {
    const current = getValues();
    reset({ ...current, desiredPack: defaultPack ?? "" });
  }, [defaultPack, getValues, reset]);

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-[#D4AF37]/15 bg-white p-8 shadow-md transition-all duration-300 dark:bg-[#112A46]"
      noValidate
      aria-busy={isLoading}
    >
      {status === "success" && (
        <Alert variant="default" role="status" aria-live="polite">
          <AlertTitle>{t("contact.form.successTitle")}</AlertTitle>
          <AlertDescription>{t("contact.form.success")}</AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertTitle>{t("contact.form.errorTitle")}</AlertTitle>
          <AlertDescription>{t("contact.form.error")}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("contact.form.labels.fullName")}</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder={t("contact.form.placeholders.fullName")}
            {...register("fullName")}
            aria-invalid={!!errors.fullName}
            aria-required="true"
            required
            className={`${fieldClass}`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600">
              {t(errors.fullName.message || "form.errors.fullName")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("contact.form.labels.email")}</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("contact.form.placeholders.email")}
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-required="true"
            required
            className={fieldClass}
          />
          {errors.email && (
            <p className="text-xs text-red-600">
              {t(errors.email.message || "form.errors.email")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("contact.form.labels.phone")}</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("contact.form.placeholders.phone")}
            {...register("phone")}
            aria-invalid={!!errors.phone}
            aria-required="true"
            required
            className={fieldClass}
          />
          {errors.phone && (
            <p className="text-xs text-red-600">
              {t(errors.phone.message || "form.errors.phone")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">{t("contact.form.labels.country")}</Label>
          <Input
            id="country"
            placeholder={t("contact.form.placeholders.country")}
            {...register("country")}
            aria-invalid={!!errors.country}
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desiredPack">
            {t("contact.form.labels.desiredPack")}
          </Label>
          <Controller
            control={control}
            name="desiredPack"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="desiredPack" className={fieldClass}>
                  <SelectValue
                    placeholder={t("contact.form.placeholders.desiredPack")}
                  />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-[#D4AF37]/20 bg-white/95 text-[#0A2239] shadow-lg dark:border-[#1E3A5F] dark:bg-[#0A2239] dark:text-[#EAEAEA]">
                  {packOptions
                    .filter((option) => option)
                    .map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
          <Label htmlFor="message">{t("contact.form.labels.message")}</Label>
          <Textarea
            id="message"
            rows={5}
            placeholder={t("contact.form.placeholders.message")}
            {...register("message")}
            aria-invalid={!!errors.message}
            aria-required="true"
            required
            className={`${fieldClass} !min-h-[160px]`}
          />
        {errors.message && (
          <p className="text-xs text-red-600">
            {t(errors.message.message || "form.errors.message")}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="consent"
              checked={field.value}
              onCheckedChange={(checked) =>
                field.onChange(checked === true)
              }
            />
          )}
        />
        <label
          htmlFor="consent"
          className="text-sm text-mutedLight dark:text-mutedDark"
        >
          {t("contact.form.consent")}
        </label>
      </div>

      {errors.consent && (
        <p className="text-xs text-red-600 dark:text-red-400">
          {t(errors.consent.message || "form.errors.consent")}
        </p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-[#D4AF37] px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#C39D2C] hover:shadow-lg disabled:opacity-60 md:w-auto"
      >
        {isLoading
          ? t("contact.form.submitLoading")
          : t("contact.form.submit")}
      </Button>
    </form>
  );
};

export default ContactForm;

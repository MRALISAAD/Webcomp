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

const packOptions = ["", "Basique", "Standard", "Premium"] as const;

const formSchema = z.object({
  fullName: z.string().trim().min(2, "form.errors.fullName"),
  email: z.string().email("form.errors.email"),
  country: z.string().optional().transform((value) => value?.trim() ?? ""),
  desiredPack: z.enum(packOptions),
  message: z.string().trim().min(20, "form.errors.message"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "form.errors.consent" }),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface ContactFormProps {
  defaultPack?: "Basique" | "Standard" | "Premium";
}

const ContactForm = ({ defaultPack }: ContactFormProps) => {
  const { t } = useTranslation();
  const { submitLead, isLoading } = useZohoForm();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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
          country: "",
          desiredPack: defaultPack ?? "",
          message: "",
          consent: false,
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
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
      className="space-y-6"
      noValidate
      aria-busy={isLoading}
    >
      {status === "success" && (
        <Alert variant="default">
          <AlertTitle>{t("contact.form.successTitle")}</AlertTitle>
          <AlertDescription>{t("contact.form.success")}</AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="destructive">
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
          />
          {errors.email && (
            <p className="text-xs text-red-600">
              {t(errors.email.message || "form.errors.email")}
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
                <SelectTrigger id="desiredPack">
                  <SelectValue
                    placeholder={t("contact.form.placeholders.desiredPack")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">
                    {t("contact.form.packPlaceholder")}
                  </SelectItem>
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
          className="text-sm text-zinc-600 dark:text-zinc-300"
        >
          {t("contact.form.consent")}
        </label>
      </div>

      {errors.consent && (
        <p className="text-xs text-red-600">
          {t(errors.consent.message || "form.errors.consent")}
        </p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-red-600 disabled:opacity-60 md:w-auto"
      >
        {isLoading
          ? t("contact.form.submitLoading")
          : t("contact.form.submit")}
      </Button>
    </form>
  );
};

export default ContactForm;

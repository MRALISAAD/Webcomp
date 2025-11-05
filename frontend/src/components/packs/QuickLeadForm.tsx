import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useZohoForm } from "../../hooks/useZohoForm";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuickLeadForm = ({ defaultPack = "" }: { defaultPack?: "" | "Essentiel" | "Confort" | "Premium" }) => {
  const { t } = useTranslation();
  const { submitLead, isLoading } = useZohoForm();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desiredPack, setDesiredPack] = useState<"" | "Essentiel" | "Confort" | "Premium">(defaultPack);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    const result = await submitLead({
      fullName,
      email,
      phone,
      country: "",
      desiredPack,
      message: "",
      consent: true,
    });
    if (result.success) {
      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder={t("contact.form.placeholders.fullName")}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="h-12"
        />
        <Input
          type="email"
          placeholder={t("contact.form.placeholders.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          type="tel"
          placeholder={t("contact.form.labels.phone")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="h-12"
        />
        <select
          className="h-12 rounded-xl border border-gold/30 bg-white/95 px-4 py-2 text-sm text-navy shadow-sm transition-all duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 focus:ring-offset-beige dark:border-gold/30 dark:bg-navyLight/80 dark:text-textLight dark:focus:ring-offset-navy"
          value={desiredPack}
          onChange={(e) => setDesiredPack(e.target.value as any)}
        >
          <option value="">{t("contact.form.packPlaceholder")}</option>
          <option value="Essentiel">Essentiel</option>
          <option value="Confort">Confort</option>
          <option value="Premium">Premium</option>
        </select>
      </div>
      <Button
        type="submit"
        className="h-12 w-full rounded-2xl bg-primary text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primaryLight hover:shadow-xl disabled:translate-y-0 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? t("contact.form.submitLoading") : t("contact.form.submit")}
      </Button>
      {status === "success" && (
        <p className="py-2 text-center text-sm font-medium text-emerald-400" role="status" aria-live="polite">
          {t("contact.form.success")}
        </p>
      )}
      {status === "error" && (
        <p className="py-2 text-center text-sm font-medium text-red-400" role="alert" aria-live="assertive">
          {t("contact.form.error")}
        </p>
      )}
    </form>
  );
};

export default QuickLeadForm;



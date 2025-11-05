import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useContactForm } from "../../hooks/useContactForm";

const ContactSimple = () => {
  const { t } = useTranslation();
  const { submitContact, isLoading } = useContactForm();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    const res = await submitContact({ fullName, email, phone, message });
    if (res.success) {
      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input placeholder={t("contact.form.placeholders.fullName")} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <Input type="email" placeholder={t("contact.form.placeholders.email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="tel" placeholder={t("contact.form.placeholders.phone")} value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Textarea rows={5} placeholder={t("contact.form.placeholders.message")} value={message} onChange={(e) => setMessage(e.target.value)} required />
      <Button type="submit" className="bg-primary hover:bg-primaryDark" disabled={isLoading}>
        {isLoading ? t("contact.form.submitLoading") : t("contact.form.submit")}
      </Button>
      {status === "success" && <p className="text-sm text-green-600">{t("contact.form.success")}</p>}
      {status === "error" && <p className="text-sm text-red-600">{t("contact.form.error")}</p>}
    </form>
  );
};

export default ContactSimple;



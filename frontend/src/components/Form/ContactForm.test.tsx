import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

const submitLeadMock = vi.fn();

vi.mock("../../hooks/useZohoForm", () => ({
  useZohoForm: () => ({
    submitLead: submitLeadMock,
    isLoading: false
  })
}));

const translations: Record<string, string> = {
  "contact.form.labels.fullName": "Nom complet",
  "contact.form.labels.email": "Courriel",
  "contact.form.labels.country": "Pays d’origine",
  "contact.form.labels.desiredPack": "Pack souhaité",
  "contact.form.labels.message": "Message (min. 20 caractères)",
  "contact.form.labels.consent": "Consentement",
  "contact.form.placeholders.fullName": "Votre nom et prénom",
  "contact.form.placeholders.email": "nom@exemple.com",
  "contact.form.placeholders.country": "Pays actuel ou de départ",
  "contact.form.placeholders.desiredPack": "Sélectionnez un pack (optionnel)",
  "contact.form.placeholders.message": "Parlez-nous de votre arrivée, des dates envisagées, de vos besoins…",
  "contact.form.packPlaceholder": "Sans préférence",
  "contact.form.consent":
    "J’accepte que mes informations soient utilisées pour me recontacter (voir Politique de confidentialité).",
  "contact.form.submit": "Envoyer ma demande",
  "contact.form.submitLoading": "Envoi en cours…",
  "contact.form.successTitle": "Demande envoyée",
  "contact.form.success": "Merci ! Un membre de l’équipe vous contactera sous 24h.",
  "contact.form.errorTitle": "Envoi impossible",
  "contact.form.error": "Impossible d’envoyer, réessayez.",
  "form.errors.fullName": "Merci d’indiquer votre nom.",
  "form.errors.email": "Adresse courriel invalide.",
  "form.errors.message": "Votre message doit contenir au moins 20 caractères.",
  "form.errors.consent": "Merci d’accepter notre consentement RGPD."
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => translations[key] ?? key
  })
}));

describe("ContactForm", () => {
  beforeEach(() => {
    submitLeadMock.mockReset();
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Envoyer ma demande" }));

    expect(await screen.findByText("Merci d’indiquer votre nom.")).toBeInTheDocument();
    expect(screen.getByText("Adresse courriel invalide.")).toBeInTheDocument();
    expect(screen.getByText("Votre message doit contenir au moins 20 caractères.")).toBeInTheDocument();
    expect(screen.getByText("Merci d’accepter notre consentement RGPD.")).toBeInTheDocument();
    expect(submitLeadMock).not.toHaveBeenCalled();
  });

  it("submits trimmed values and displays success message", async () => {
    submitLeadMock.mockResolvedValueOnce({ success: true });
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Nom complet"), "  Amine Test ");
    await user.type(screen.getByLabelText("Courriel"), "amine@example.com");
    await user.type(screen.getByLabelText("Message (min. 20 caractères)"), "   Bonjour, je souhaite plus d’informations.   ");
    await user.click(
      screen.getByLabelText(
        "J’accepte que mes informations soient utilisées pour me recontacter (voir Politique de confidentialité)."
      )
    );
    await user.click(screen.getByRole("button", { name: "Envoyer ma demande" }));

    await waitFor(() => expect(submitLeadMock).toHaveBeenCalledTimes(1));
    expect(submitLeadMock).toHaveBeenCalledWith({
      fullName: "Amine Test",
      email: "amine@example.com",
      country: "",
      desiredPack: "",
      message: "Bonjour, je souhaite plus d’informations.",
      consent: true
    });

    expect(await screen.findByText("Merci ! Un membre de l’équipe vous contactera sous 24h.")).toBeInTheDocument();
  });

  it("shows error alert if submission fails", async () => {
    submitLeadMock.mockResolvedValueOnce({ success: false });
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Nom complet"), "Salma");
    await user.type(screen.getByLabelText("Courriel"), "salma@example.com");
    await user.type(screen.getByLabelText("Message (min. 20 caractères)"), "Je voudrais en savoir plus sur vos packs.");
    await user.click(
      screen.getByLabelText(
        "J’accepte que mes informations soient utilisées pour me recontacter (voir Politique de confidentialité)."
      )
    );
    await user.click(screen.getByRole("button", { name: "Envoyer ma demande" }));

    await waitFor(() => expect(submitLeadMock).toHaveBeenCalledTimes(1));
    expect(await screen.findByText("Impossible d’envoyer, réessayez.")).toBeInTheDocument();
  });
});

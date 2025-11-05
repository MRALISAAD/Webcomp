import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import api from "../../utils/api";

const PACK_ORDER = ["essential", "comfort", "premium"] as const;
type PackSlug = (typeof PACK_ORDER)[number];

interface BookingPopupProps {
  open: boolean;
  selectedPack: PackSlug;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  pack: PackSlug;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  pack: "essential",
};

const fieldClassName =
  "w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-2 text-sm text-gray-100 placeholder-gray-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#bfa45b] focus:border-[#bfa45b]";

const overlayClassName =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8";
const modalClassName =
  "relative w-full max-w-md rounded-2xl bg-[#0b2239] p-8 shadow-xl transition-colors";

const buttonBase =
  "inline-flex items-center justify-center rounded-full bg-[#bfa45b] py-3 text-sm font-semibold text-[#0b2239] shadow-md transition hover:-translate-y-0.5 hover:bg-[#a68d44] disabled:cursor-not-allowed disabled:opacity-70";

const BookingPopup = ({ open, selectedPack, onClose }: BookingPopupProps) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({ ...initialForm, pack: selectedPack });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);

  const texts = useMemo(
    () =>
      t("bookingPopup", {
        returnObjects: true,
      }) as {
        title: string;
        subtitle: string;
        fields: { name: string; email: string; phone: string; pack: string };
        packs: Record<PackSlug, string>;
        submit: string;
        sending: string;
        successTitle: string;
        successDescription: string;
        close: string;
        error: string;
      },
    [t]
  );

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...prev, pack: selectedPack }));
      setIsSuccess(false);
      setError(null);
      document.body.style.overflow = "hidden";

      const focusTimer = window.setTimeout(() => {
        firstFieldRef.current?.focus({ preventScroll: true });
      }, 50);

      return () => {
        window.clearTimeout(focusTimer);
      };
    }

    document.body.style.overflow = "";
    return undefined;
  }, [open, selectedPack]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );

        if (!focusableElements || focusableElements.length === 0) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const packLabel = texts.packs[selectedPack];

  const handleChange = (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        pack: form.pack,
        source: "home-popup",
      };

      const response = await api.post("/leads", payload);
      const success = response?.data?.success ?? true;

      if (success) {
        setIsSuccess(true);
        setForm({ ...initialForm, pack: selectedPack });
      } else {
        setError(texts.error);
      }
    } catch (submissionError) {
      console.error("booking.popup.submit_error", submissionError);
      setError(texts.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (isSuccess) {
    return (
      <div className={overlayClassName} onClick={handleOverlayClick} role="presentation">
        <div
          ref={dialogRef}
          className={modalClassName}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
        >
          <button
            type="button"
            className="absolute right-4 top-3 text-2xl text-gray-400 transition hover:text-gray-200"
            aria-label={texts.close}
            onClick={onClose}
          >
            ×
          </button>
          <div className="py-6 text-center">
            <h3
              id="booking-success-title"
              className="text-xl font-semibold text-[#bfa45b]"
            >
              {texts.successTitle}
            </h3>
            <p className="mt-2 text-sm text-gray-300">{texts.successDescription}</p>
            <button
              type="button"
              ref={lastFocusableRef}
              className={cn(buttonBase, "mt-6 w-full justify-center")}
              onClick={onClose}
            >
              {texts.close}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={overlayClassName} onClick={handleOverlayClick} role="presentation">
      <div
        ref={dialogRef}
        className={modalClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-description"
      >
        <button
          type="button"
          className="absolute right-4 top-3 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:text-gray-200"
          onClick={onClose}
          aria-label={texts.close}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <h3
          id="booking-modal-title"
          className="mb-2 text-center text-2xl font-bold text-gray-100"
        >
          {texts.title.replace("{{pack}}", packLabel)}
        </h3>
        <p
          id="booking-modal-description"
          className="mb-6 text-center text-sm text-gray-300"
        >
          {texts.subtitle}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              {texts.fields.name}
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={handleChange("name")}
              className={fieldClassName}
              ref={firstFieldRef}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              {texts.fields.email}
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={handleChange("email")}
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              {texts.fields.phone}
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={handleChange("phone")}
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              {texts.fields.pack}
            </label>
            <select
              value={form.pack}
              onChange={handleChange("pack")}
              className={fieldClassName}
            >
              {PACK_ORDER.map((slug) => (
                <option key={slug} value={slug}>
                  {texts.packs[slug]}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            className={cn(buttonBase, "w-full justify-center")}
            disabled={isSubmitting}
            ref={lastFocusableRef}
          >
            {isSubmitting ? texts.sending : texts.submit}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;

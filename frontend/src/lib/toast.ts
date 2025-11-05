import { CheckCircleIcon, AlertCircleIcon, InfoIcon, XCircleIcon } from "lucide-react";
import { toast } from "../components/ui/use-toast";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastOptions {
  title?: string;
  description: string;
  duration?: number;
}

export const showToast = {
  success: ({ title, description, duration = 5000 }: ToastOptions) => {
    toast({
      title: title || "Success",
      description,
      duration,
      className: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100",
    });
  },

  error: ({ title, description, duration = 7000 }: ToastOptions) => {
    toast({
      title: title || "Error",
      description,
      duration,
      variant: "destructive",
    });
  },

  info: ({ title, description, duration = 5000 }: ToastOptions) => {
    toast({
      title: title || "Information",
      description,
      duration,
      className: "border-blue-200 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100",
    });
  },

  warning: ({ title, description, duration = 6000 }: ToastOptions) => {
    toast({
      title: title || "Warning",
      description,
      duration,
      className: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100",
    });
  },
};

// Convenience functions
export const toastSuccess = showToast.success;
export const toastError = showToast.error;
export const toastInfo = showToast.info;
export const toastWarning = showToast.warning;


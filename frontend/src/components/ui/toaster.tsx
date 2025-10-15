import { useEffect } from "react";
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose
} from "./toast";
import { useToast } from "./use-toast";

const Toaster = () => {
  const { toasts, dismiss } = useToast();

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => dismiss(toasts[0]?.id), 6000);
      return () => clearTimeout(timer);
    }
    return;
  }, [dismiss, toasts]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </div>
            {action}
            <ToastClose onClick={() => dismiss(id)} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toaster;

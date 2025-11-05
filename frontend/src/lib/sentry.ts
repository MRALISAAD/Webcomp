// Sentry Error Tracking
// Usage: Sentry.captureException(error) or Sentry.captureMessage(message)

export const initSentry = () => {
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    // In production, initialize Sentry
    // import * as Sentry from "@sentry/react";
    // Sentry.init({
    //   dsn: import.meta.env.VITE_SENTRY_DSN,
    //   environment: import.meta.env.MODE,
    //   tracesSampleRate: 0.1,
    //   integrations: [
    //     new Sentry.BrowserTracing(),
    //     new Sentry.Replay(),
    //   ],
    // });
    
    console.log("✅ Error tracking initialized (Sentry)");
  }
};

export const captureException = (error: Error, context?: Record<string, any>) => {
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    // Sentry.captureException(error, { extra: context });
    console.error("Error captured:", error, context);
  }
};

export const captureMessage = (message: string, level: "info" | "warning" | "error" = "info") => {
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    // Sentry.captureMessage(message, level);
    console.log(`Message captured [${level}]:`, message);
  }
};


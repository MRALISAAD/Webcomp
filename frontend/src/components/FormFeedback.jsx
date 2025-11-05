const styles = {
  success: "text-green-700 dark:text-emerald-300 bg-green-50/90 dark:bg-emerald-500/10",
  error: "text-red-700 dark:text-rose-200 bg-red-50/90 dark:bg-rose-500/10",
  info: "text-grayText dark:text-beige bg-white/60 dark:bg-white/5",
};

export default function FormFeedback({ type = "info", message }) {
  if (!message) return null;
  const tone = styles[type] || styles.info;

  return (
    <p className={`rounded-xl px-4 py-3 text-sm font-medium shadow-sm ${tone}`} role="status" aria-live="polite">
      {message}
    </p>
  );
}

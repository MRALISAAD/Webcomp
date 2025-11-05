const DEFAULT_RETRIES = 3;
const DEFAULT_DELAY = 400;

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export async function withRetry(task, { retries = DEFAULT_RETRIES, delay = DEFAULT_DELAY, onRetry } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await task(attempt);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        onRetry?.(attempt, error);
        await wait(delay * attempt);
      }
    }
  }
  throw lastError;
}

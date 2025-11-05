const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/$/, "");
const DEFAULT_HEADERS = { "Content-Type": "application/json" };

async function request(path, { method = "GET", data, headers = {}, signal } = {}) {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    method,
    headers: data ? { ...DEFAULT_HEADERS, ...headers } : headers,
    body: data ? JSON.stringify(data) : undefined,
    signal,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text();

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && payload.message) ||
      (typeof payload === "string" && payload) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return { data: payload, status: response.status, headers: response.headers };
}

export const api = {
  get: (path, config = {}) => request(path, { ...config, method: "GET" }),
  post: (path, data, config = {}) => request(path, { ...config, method: "POST", data }),
  put: (path, data, config = {}) => request(path, { ...config, method: "PUT", data }),
  patch: (path, data, config = {}) => request(path, { ...config, method: "PATCH", data }),
  delete: (path, config = {}) => request(path, { ...config, method: "DELETE" }),
};

export default api;

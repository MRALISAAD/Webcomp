const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.message || "Une erreur est survenue");
    error.details = data;
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  return data;
}

export async function adminLogin(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
}

export async function fetchDemandes(token) {
  const response = await fetch(`${API_BASE_URL}/api/admin/demandes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
}

export { API_BASE_URL };

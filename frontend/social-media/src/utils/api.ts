
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = async (endpoint: string, method: string, body?: any) => {
  // Ensure API_URL is defined
  if (!API_URL) {
    throw new Error("API_URL is not defined in environment variables");
  }

  // Retrieve token from localStorage if on the client-side
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};

export default api;

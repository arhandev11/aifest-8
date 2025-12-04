// API Base URL - Change this to your actual API URL
export const API_BASE_URL = "https://api.aisyahfestival.com";

// Default headers for all requests
const defaultHeaders: HeadersInit = {
  'Accept': 'application/json',
};

// API fetch helper with default headers
export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const { headers, ...rest } = options;

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });
};

// API fetch with auth token
export const apiFetchWithAuth = async (
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<Response> => {
  const { headers, ...rest } = options;

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      ...defaultHeaders,
      'Authorization': `Bearer ${token}`,
      ...headers,
    },
  });
};

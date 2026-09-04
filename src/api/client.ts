import axios, { AxiosError, type AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Centralized error handling - ready for future backend integration
    console.error('[API Error]', error.message);
    return Promise.reject(error);
  }
);

export function handleApiError<T>(error: unknown, fallback: T): T {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error?.message ?? error.message;
    console.error(message);
    return fallback;
  }
  return fallback;
}
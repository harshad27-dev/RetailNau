import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../store/store";

/**
 * Detect correct base URL for Expo environments
 *
 * Android Emulator → 10.0.2.2
 * iOS Simulator → localhost
 * Physical Device → use your system IP
 */

const getBaseURL = () => {
  const envURL = process.env.EXPO_PUBLIC_API_URL;

  if (envURL) return envURL;

  // Fallback (adjust if needed)
  return "http://10.0.2.2:4000";
};

const baseURL = getBaseURL();

/**
 * Axios Instance
 */
export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attach JWT token
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Global error handling
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle Unauthorized globally
      if (status === 401) {
        console.log("⚠️ Unauthorized - Token may be expired");

        // Optional:
        // store.dispatch(logout());
      }

      // Format error message
      const message =
        data?.message ||
        data?.error ||
        "Something went wrong. Please try again.";

      return Promise.reject(new Error(message));
    }

    // Network error
    if (error.request) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    return Promise.reject(error);
  }
);

export default api;
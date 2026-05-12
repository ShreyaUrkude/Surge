import axios from "axios";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://surge-backend-seven.vercel.app';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Automatically attach the payload-token from cookies on every request
axiosClient.interceptors.request.use((config) => {
  const payloadToken = Cookies.get("payload-token");

  if (payloadToken) {
    config.headers["Authorization"] = `JWT ${payloadToken}`;
  }

  return config;
});

let isSigningOut = false;

// If an authenticated request gets a 401 (token invalid / user deleted),
// clear the session and redirect to auth so the user gets a clean login prompt.
// Also handles stale-cookie 403s on public endpoints: strips auth and retries once.
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const config = error.config;
    const wasAuthenticated = !!config?.headers?.["Authorization"];

    if ((status === 401 || status === 403) && wasAuthenticated) {
      // Clear the stale token so it doesn't keep triggering this on every load.
      Cookies.remove("payload-token", { path: "/" });

      if (status === 401 && !isSigningOut) {
        isSigningOut = true;
        await signOut({ redirect: false });
        window.location.href = "/auth";
        return Promise.reject(error);
      }

      // Retry the request once without the Authorization header.
      // Prevents CORS/403 on public endpoints caused by an expired session cookie.
      if (!config._authRetry) {
        config._authRetry = true;
        delete config.headers["Authorization"];
        return axiosClient(config);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

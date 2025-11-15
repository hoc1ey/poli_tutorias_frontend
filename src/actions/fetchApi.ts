"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clearAuthCookies } from "./auth/clear-auth-cookies";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const attemptTokenRefresh = async (): Promise<boolean> => {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  if (!refreshToken) {
    cookiesStore.delete("token");
    cookiesStore.delete("refreshToken");
    redirect("/auth/login");
    return false;
  }

  const refreshResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
    },
  });

  if (refreshResponse.ok) {
    const data = await refreshResponse.json();

    const cookieStore = await cookies();
    cookieStore.set("token", data.accessToken);
    cookieStore.set("refreshToken", data.refreshToken);

    return true;
  } else {
    await clearAuthCookies();
    redirect("/auth/login");
    return false;
  }
};

export const fetchApi = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const fullUrl = url.startsWith("http") ? url : `${BACKEND_URL}${url}`;

  const setAuthHeaders = async (): Promise<Headers> => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const method = (options.method || "GET").toString().toUpperCase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = options.body as any;

    const isFormData =
      typeof FormData !== "undefined" && body instanceof FormData;
    const isURLSearchParams =
      typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams;

    if (
      !headers.get("Content-Type") &&
      method !== "GET" &&
      !isFormData &&
      !isURLSearchParams
    ) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  };

  let response = await fetch(fullUrl, {
    ...options,
    headers: await setAuthHeaders(),
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshed = await attemptTokenRefresh();

    if (refreshed) {
      response = await fetch(fullUrl, {
        ...options,
        headers: await setAuthHeaders(),
      });
    }
  }

  return response;
};

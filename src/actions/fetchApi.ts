"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const attemptTokenRefresh = async (): Promise<boolean> => {
  const cookiesStore = await cookies();
  const userCookie = cookiesStore.get("user")?.value;
  let refreshToken: string | undefined;

  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      refreshToken = userData.refreshToken;
    } catch (error) {
      console.error('Error parsing user cookie for refresh:', error);
    }
  }

  if (!refreshToken) {
    cookiesStore.delete("user");
    redirect("/auth/login");
    return false;
  }

  const refreshResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${refreshToken}`,
      "Content-Type": "application/json"
    },
  });

  if (refreshResponse.ok) {
    const data = await refreshResponse.json();

    const userCookie = cookiesStore.get("user")?.value;
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        userData.accessToken = data.accessToken;
        userData.refreshToken = data.refreshToken;

        cookiesStore.set("user", JSON.stringify(userData), {
          httpOnly: false,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 2 // 2 horas
        });
      } catch (error) {
        console.error('Error updating user cookie:', error);
      }
    }

    return true;
  } else {
    cookiesStore.delete("user");
    redirect("/auth/login");
    return false;
  }
}

export const fetchApi = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const fullUrl = url.startsWith("http") ? url : `${BACKEND_URL}${url}`;

  const setAuthHeaders = async (): Promise<Headers> => {

    const cookiesStore = await cookies();
    const userCookie = cookiesStore.get("user")?.value;
    let token: string | undefined;

    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        token = userData.accessToken;
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }

    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const method = (options.method || "GET").toString().toUpperCase();
    const body = options.body as any;

    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    const isURLSearchParams = typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams;

    if (!headers.get("Content-Type") && method !== "GET" && !isFormData && !isURLSearchParams) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers: await setAuthHeaders(),
    credentials: 'include',
    cache: 'no-store'
  };

  let response = await fetch(fullUrl, fetchOptions);

  if (response.status === 401) {
    const refreshed = await attemptTokenRefresh();

    if (refreshed) {
      response = await fetch(fullUrl, fetchOptions);
    }
  }

  return response;
};
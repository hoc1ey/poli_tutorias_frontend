"use server";

import { setAuthCookies } from "..";
import { LoginResponse } from "../../interfaces";

interface LoginData {
  email: string;
  password: string;
  role: "tutor" | "student";
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const handleLogin = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(loginData),
      redirect: "follow",
    };

    const response = await fetch(`${BACKEND_URL}/auth/login`, requestOptions);
    const result: LoginResponse = await response.json();

    if (result.success) {
      const { accessToken, refreshToken, ...user } = result.data;
      await setAuthCookies({ accessToken, refreshToken, user });
    }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      errorCode: "NETWORK_ERROR",
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: "/api/auth/register",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: undefined as any,
    };
  }
};

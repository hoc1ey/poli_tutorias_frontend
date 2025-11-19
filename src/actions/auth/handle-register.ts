"use server";

import { LoginResponse } from "@/interfaces";
import { setAuthCookies } from "./set-auth-cookies";

interface userData {
  name: string;
  lastName: string;
  dni: string;
  uniqueCode: string;
  primaryPhone: string;
  optionalPhone: string | undefined;
  faculty: string;
  career: string;
  email: string;
  password: string;
  role: ("tutor" | " student")[];
  bio: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const handleRegister = async (
  user: userData
): Promise<LoginResponse> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user),
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/auth/register`,
      requestOptions
    );
    const result: LoginResponse = await response.json();

    if (result.success) {
      const { data: user } = result;
      await setAuthCookies({ user });
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

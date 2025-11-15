"use server";

import { revalidatePath } from "next/cache";
import { User } from "../../interfaces";

interface AuthSuccessResponse {
  accessToken: string;
  refreshToken?: string;
  user: Partial<User>;
}

export const setAuthCookies = async ({
  accessToken: token,
  refreshToken,
  user,
}: AuthSuccessResponse) => {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: isProduction, // HTTPS only in staging/prod
    sameSite: isProduction ? "none" : "lax", // cross-site cookies allowed
    path: "/",
    maxAge: 60 * 60 * 2, // 2h
  });

  if (refreshToken) {
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7d
    });
  }

  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  revalidatePath("/");
  revalidatePath("/tutor/offers");
  revalidatePath("/student");
};

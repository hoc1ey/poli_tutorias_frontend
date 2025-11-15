"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("refreshToken");
  cookieStore.delete("user");

  revalidatePath("/");
  revalidatePath("/tutor/offers");
  revalidatePath("/student");
};

export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getUserSession } from "@/actions";

export default async function Home() {
  const user = await getUserSession();

  if (!user) {
    redirect('/auth/login');
  }

  const roles = user.role || [];

  if (roles.includes('tutor')) {
    redirect('/tutor/offers');
  }

  if (roles.includes('student')) {
    redirect('/student');
  }

  redirect('/auth/login');
}

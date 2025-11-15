export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getUserSession } from "../../actions";

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const user = await getUserSession();

  if (user) {
    if (user.role![0] === 'tutor') {
      redirect('/tutor/offers');
    } else {
      redirect('/student')
    }
  }

  return (
    <div>
      {children}
    </div>
  );
}
export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getUserSession } from "../../actions";
import { TopMenu } from "../../components";


const menuItems = [
  {
    title: 'Inicio',
    href: '/student',
    matchPathname: '/student',
    matchPrefixes: ['/student/offer/']
  },
  {
    title: 'Mis Tutorías',
    href: '/student/requests',
    matchPathname: '/student/requests',
  },
]

export default async function StudentLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const user = await getUserSession();

  if (!user) {
    redirect('/auth/login')
  }

  if (user.role![0] !== 'student') {
    redirect('/tutor/offers')
  }

  return (
    <>
      <TopMenu
        menuItems={menuItems}
        image={user!.image || ''}
        name={user!.name || ''}
        lastName={user!.lastName || ''}
        email={user!.email || ''}
        role={user!.role![0] || 'student'}
      />
      <div
      >
        {children}
      </div>
    </>

  );
}
export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getUserSession } from "../../actions";
import { TopMenu } from "../../components";

const menuItems = [
  {
    title: 'Mis Ofertas',
    href: '/tutor/offers',
    matchPathname: '/tutor/offers',
    matchPrefixes: ['/tutor/offer']
  },
  {
    title: 'Mi Horario',
    href: '/tutor/schedule',
    matchPathname: '/tutor/schedule',
  },
]

export default async function TutorLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const user = await getUserSession();

  if (!user) {
    redirect('/auth/login')
  }

  if (user.role![0] !== 'tutor') {
    redirect('/student')
  }


  return (
    <>
      <TopMenu
        menuItems={menuItems}
        image={user!.image || ''}
        name={user!.name || ''}
        lastName={user!.lastName || ''}
        email={user!.email || ''}
        role={user!.role![0] || 'tutor'}
      />
      <div
        className='mx-5 md:mx-[50px] my-3 md:my-5'
      >
        {children}
      </div>
    </>
  );
}
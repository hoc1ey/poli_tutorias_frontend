'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../../interfaces';

interface AuthSuccessResponse {
  user: User;
}

export const setAuthCookies = async ({ user }: AuthSuccessResponse) => {

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  cookieStore.set('user', JSON.stringify(user), {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2
  });

  revalidatePath('/');
  revalidatePath('/tutor/offers');
  revalidatePath('/student');

};